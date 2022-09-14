import { decimalPlaces } from "lib/consts/consts";
import NumberFormat from "react-number-format";

const Dollar = ({ amount, coin }) => {
  return (
    <NumberFormat
      value={Number(amount).toFixed(decimalPlaces[coin])}
      displayType={"text"}
      thousandSeparator={true}
    />
  );
};

export default Dollar;
