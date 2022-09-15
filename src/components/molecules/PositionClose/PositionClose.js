import ConfirmSellLabel from "components/atoms/ConfirmSellLabel/ConfirmSellLabel";
import PageError from "components/templates/PageError/PageError";
import { usePricesState } from "lib/contexts/pricesProvider";
import useCustomConfirm from "lib/hooks/useCustomConfirm";
import useHandleForm from "lib/hooks/useHandleForm";
import StyledPositionClose from "./StyledPositionClose";
import axios from "axios";
import FormError from "../FormError/FormError";
import Router from "next/router";

const PositionClose = ({ coin, amountOfCoin, positionId, walletId }) => {
  const { data: coinData, error: coinError } = usePricesState();
  if (!coinData) return "Loading...";
  if (coinError.isError) return <PageError error={coinError.error} />;

  const priceOnExit = coinData[coin];

  const { execute, error } = useHandleForm(sendData, handleSuccess);

  function sendData() {
    return axios({
      url: `http://localhost:3000/api/sell-currency`,
      method: "put",
      data: {
        coin,
        amountOfCoin,
        positionId,
        walletId,
        priceOnExit,
      },
    });
  }

  const customConfirmOptions = {
    Component: (
      <ConfirmSellLabel
        amountOfCoin={amountOfCoin}
        coinName={coin}
        coinPrice={priceOnExit}
      />
    ),
    onConfirm: execute,
    accept: "Ok",
    refuse: "No",
  };

  const { attachCustomConfirm, displayConfirm } =
    useCustomConfirm(customConfirmOptions);

  const sellCurrency = () => {
    displayConfirm(true);
  };

  function handleSuccess(res) {
    Router.push({
      pathname: "/success",
      query: { details: btoa(JSON.stringify(res.data)) },
    });
  }

  return (
    <StyledPositionClose>
      <button onClick={sellCurrency}>Close position</button>
      {error.isError && <FormError error={error.error} />}
      {attachCustomConfirm()}
    </StyledPositionClose>
  );
};

export default PositionClose;
