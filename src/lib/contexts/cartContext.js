import useHandleForm from "lib/hooks/useHandleForm";
import { createContext, useContext, useState } from "react";
import Router from "next/router";
import axios from "axios";
import useCustomConfirm from "lib/hooks/useCustomConfirm";
import ConfirmPurchaseLabel from "components/atoms/ConfirmPurchaseLabel/ConfirmPurchaseLabel";

const CartContext = createContext(null);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({
  userId,
  children,
  walletId,
  coin,
  coinPrice,
  usersDollars,
}) => {
  const { execute, pending, error, unsetErrors } = useHandleForm(
    sendData,
    handleSuccess
  );

  const [formData, setFormData] = useState({
    amountOfCoin: 0,
    expenseInDollars: 0,
    description: "",
    lastUpdatedField: "",
  });

  function sendData() {
    return axios({
      url: `${window.location.origin}/api/buy-currency`,
      method: "post",
      data: {
        walletId,
        coin: coin.key,
        amountOfCoin: formData.amountOfCoin,
        priceOnEntry: coinPrice,
        description: formData.description.trim(),
      },
    });
  }

  const isAuthenticated = !!userId;

  const customConfirmOptions = {
    Component: (
      <ConfirmPurchaseLabel
        amountOfCoin={formData.amountOfCoin}
        coin={coin}
        coinPrice={coinPrice}
      />
    ),
    onConfirm: execute,
    accept: "Ok",
    refuse: "No",
  };

  const { attachCustomConfirm, displayConfirm } =
    useCustomConfirm(customConfirmOptions);

  function buyCurrency(e) {
    e.preventDefault();
    displayConfirm(true);
  }

  const redirectToRegister = (e) => {
    e.preventDefault();
    Router.push("/register");
  };

  function handleSuccess(res) {
    Router.push({
      pathname: "/success",
      query: { details: btoa(JSON.stringify(res.data)) },
    });
  }

  return (
    <CartContext.Provider
      value={{
        formData,
        setFormData,
        coin,
        coinPrice,
        action: isAuthenticated ? buyCurrency : redirectToRegister,
        isAuthenticated,
        execute,
        pending,
        error,
        unsetErrors,
        usersDollars,
      }}
    >
      {children}
      {attachCustomConfirm()}
    </CartContext.Provider>
  );
};
