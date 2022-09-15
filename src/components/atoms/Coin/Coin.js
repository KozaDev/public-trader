import { decimalPlaces } from "lib/consts/consts";
import NumberFormat from "react-number-format";

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

export default Coin;
