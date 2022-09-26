import { confirmLabelsProps } from "lib/proptypes/proptypes";
import Coin from "../Coin/Coin";

const ConfirmPurchaseLabel = ({ amountOfCoin, coin, coinPrice }) => (
  <div>
    <>{"Do you want to buy "}</>
    <Coin amount={amountOfCoin} coin={coin.key} displayPrefix />
    <>{` for `}</>
    <Coin amount={coinPrice * amountOfCoin} coin={"usd"} displayPrefix />
    <>{"?"}</>
  </div>
);

ConfirmPurchaseLabel.propTypes = { confirmLabelsProps };

export default ConfirmPurchaseLabel;
