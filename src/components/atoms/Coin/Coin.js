import { decimalPlaces } from "lib/consts/consts";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

const Coin = ({ amount, coin, displayPrefix }) => {
  const amoutWithRigthDecimalPlaces = Number(amount).toFixed(
    decimalPlaces[coin]
  );

  const noZeroAmount = amoutWithRigthDecimalPlaces * 1;
  return (
    <>
      {displayPrefix && <>{coin.toUpperCase() + " "}</>}
      <NumberFormat
        value={noZeroAmount}
        displayType={"text"}
        thousandSeparator={true}
      />
    </>
  );
};

Coin.prototype = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  coin: PropTypes.string.isRequired,
  displayPrefix: PropTypes.bool,
};

export default Coin;
