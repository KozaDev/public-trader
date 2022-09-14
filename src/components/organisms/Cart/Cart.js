import { useEffect } from "react";
import PurchaseForm from "../../molecules/PurchaseForm/PurchaseForm";
import { decimalPlaces } from "lib/consts/consts";
import { useCartContext } from "lib/contexts/cartContext";
import { isNumberInputValid } from "lib/utils/utils";

const Cart = () => {
  const { formData, setFormData, coinPrice, coin, unsetErrors } =
    useCartContext();

  const updateAmountOfCoin = (state) => ({
    ...state,
    amountOfCoin: (state.expenseInDollars / coinPrice).toFixed(
      decimalPlaces[coin.key]
    ),
  });
  const updateExpenseInDollars = (state) => ({
    ...state,
    expenseInDollars: (state.amountOfCoin * coinPrice).toFixed(
      decimalPlaces["usd"]
    ),
  });

  useEffect(() => {
    setFormData(
      formData.lastUpdatedField === "amountOfCoin"
        ? updateExpenseInDollars
        : updateAmountOfCoin
    );
  }, [coinPrice]);

  const preventKeyDown = (e) => {
    const exceptThisSymbols = ["e", "E", "+", "-"];
    return exceptThisSymbols.includes(e.key) && e.preventDefault();
  };

  const handleChange = (e) => {
    unsetErrors();
    if (
      (e.target.name !== "amountOfCoin") &
      (e.target.name !== "expenseInDollars")
    ) {
      setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
      return;
    }

    if (
      e.target.name === "amountOfCoin" &&
      isNumberInputValid(e.target.value, decimalPlaces[coin.key])
    ) {
      setFormData(() => ({
        expenseInDollars: (e.target.value * coinPrice).toFixed(
          decimalPlaces["usd"]
        ),
        amountOfCoin: e.target.value,
        lastUpdatedField: e.target.name,
      }));
    }
    if (
      e.target.name === "expenseInDollars" &&
      isNumberInputValid(e.target.value, decimalPlaces["usd"])
    ) {
      setFormData(() => ({
        expenseInDollars: e.target.value,
        amountOfCoin: (e.target.value / coinPrice).toFixed(
          decimalPlaces[coin.key]
        ),
        lastUpdatedField: e.target.name,
      }));
    }
  };

  return (
    <PurchaseForm
      handleChange={handleChange}
      formData={formData}
      preventKeyDown={preventKeyDown}
    />
  );
};

export default Cart;
