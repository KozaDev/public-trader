import NumberFormat from "react-number-format";
import { decimalPlaces } from "lib/consts";

const Wallet = ({ assets }) => {
  const activeAssets = assets.reduce((acc, item) => {
    if (item.amount > 0) {
      acc.push(
        <li key={item.currency}>
          <NumberFormat
            value={item.amount.toFixed(decimalPlaces[item.key])}
            displayType={"text"}
            thousandSeparator={true}
            prefix={item.currency === "dollar" ? "$" : null}
          />{" "}
          - {item.currency}
        </li>
      );
    }
    return acc;
  }, []);

  return (
    <ul>
      {activeAssets.length > 0 ? (
        activeAssets
      ) : (
        <li>
          <h3>This user dosen't have any assets in wallet</h3>
        </li>
      )}
    </ul>
  );
};

export default Wallet;
