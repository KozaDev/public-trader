import Dollar from "../Dollar/Dollar";
import Coin from "../Coin/Coin";
import PropTypes from "prop-types";

const DisplayCurrency = ({ amount, coin, displayPrefix }) => {
  const isItDollar = coin === "usd";
  return (
    <>
      {isItDollar ? (
        <Dollar amount={amount} displayPrefix={!!displayPrefix} />
      ) : (
        <Coin
          amount={amount}
          coin={coin}
          displayPrefix={!!displayPrefix}
          layPrefix
        />
      )}
    </>
  );
};

DisplayCurrency.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  coin: PropTypes.string.isRequired,
  displayPrefix: PropTypes.bool,
};

export default DisplayCurrency;
