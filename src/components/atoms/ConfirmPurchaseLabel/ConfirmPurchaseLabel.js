import { confirmLabelsProps } from "lib/proptypes/proptypes";
import Coin from "../Coin/Coin";
import Dollar from "../Dollar/Dollar";

const ConfirmPurchaseLabel = ({ amountOfCoin, coin, coinPrice }) => (
  <div>
    <>{"Do you want to buy "}</>
    <Coin amount={amountOfCoin} coin={coin.key} />
    <>{` of ${coin.currency} for `}</>
    <Dollar amount={coinPrice * amountOfCoin} />
  </div>
);

ConfirmPurchaseLabel.propTypes = { confirmLabelsProps };

export default ConfirmPurchaseLabel;
