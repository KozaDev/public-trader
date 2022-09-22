import { confirmLabelsProps } from "lib/proptypes/proptypes";
import Coin from "../Coin/Coin";
import Dollar from "../Dollar/Dollar";

const ConfirmSellLabel = ({ amountOfCoin, coin, coinPrice }) => (
  <div>
    <>{"Do you want to sell "}</>
    <Coin amount={amountOfCoin} coin={coin.key} />
    <>{` of ${coin.currency} for `}</>
    <Dollar amount={coinPrice * amountOfCoin} />
    <>{"?"}</>
  </div>
);

ConfirmSellLabel.propTypes = { confirmLabelsProps };

export default ConfirmSellLabel;
