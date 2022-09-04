import { errorMessages } from "lib/consts";
import { usePricesState } from "lib/contexts/pricesProvider";
import { isNumberInputValid } from "lib/utils";
import { useEffect, useState } from "react";
import { StyledCard } from "styles/components";
import PageError from "../../templates/PageError/PageError";
import PurchaseForm from "../../molecules/PurchaseForm/PurchaseForm";
import NumberFormat from "react-number-format";
import useHandleForm from "lib/hooks/useHandleForm";
import axios from "axios";
import FormError from "../../molecules/FormError/FormError";
import { decimalPlaces } from "lib/consts";

const Purchase = ({ coin, user }) => {
  const { data: coinsPrices, error } = usePricesState();
  const {
    execute,
    pending,
    error: formError,
    unsetErrors,
  } = useHandleForm(sendData, handleSuccess);

  const [formData, setFormData] = useState({
    amountOfCoin: 0,
    expenseInDollars: 0,
    description: "",
    lastUpdatedField: "",
  });

  const buyCurrency = (e) => {
    e.preventDefault();
    execute();
  };

  function handleSuccess(res) {
    console.log(res);
  }

  function sendData() {
    return axios({
      data: {
        userId: user.id,
        walletId: user.wallet.id,
        coin: coin.key,
        amountOfCoin: formData.amountOfCoin,
        priceOnEntry: coinsPrices[coin.key],
        description: "my position",
      },
    });
  }
  let coinPrice = coinsPrices?.[coin.key];

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
    if (coinsPrices) {
      coinPrice = coinsPrices[coin.key];

      setFormData(
        formData.lastUpdatedField === "amountOfCoin"
          ? updateExpenseInDollars
          : updateAmountOfCoin
      );
    }
  }, [coinsPrices]);

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
  const displayComponent = () => {
    if (error.isError)
      return <PageError error={{ message: errorMessages.noPrice }} />;
    if (!coinsPrices) return <>{"Loading..."}</>;

    const currentCoinPrice = (
      <h2>
        Current {coin.currency} price:{" "}
        <NumberFormat
          value={coinPrice.toFixed(decimalPlaces["usd"])}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </h2>
    );

    if (!user) return currentCoinPrice;

    const usersDollars = user.wallet.assets.reduce((acc, item) => {
      if (item.key === "usd") return item.amount;
      return acc;
    }, 0);

    return (
      <>
        {currentCoinPrice}

        <>
          <PurchaseForm
            handleChange={handleChange}
            formData={formData}
            buyCurrency={buyCurrency}
          />
          {formError.isError && <FormError error={formError.error} />}
          <>{formData.expenseInDollars > usersDollars && <>'no mone'</>}</>
          <>
            {"your money: "}
            <NumberFormat
              value={usersDollars.toFixed(decimalPlaces["usd"])}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </>
        </>
      </>
    );
  };
  return <StyledCard>{displayComponent()}</StyledCard>;
};

export default Purchase;
