import { confirmLabelsProps } from "lib/proptypes/proptypes";
import Coin from "../Coin/Coin";

const ConfirmSellLabel = ({ amountOfCoin, coin, coinPrice }) => (
  <div>
    <>{"Do you want to sell "}</>
    <Coin amount={amountOfCoin} coin={coin.key} />
    <>{` of ${coin.currency} for `}</>
    <Coin amount={coinPrice * amountOfCoin} coin={"usd"} displayUsdPrefix />
    <>{"?"}</>
  </div>
);

ConfirmSellLabel.propTypes = { confirmLabelsProps };

export default ConfirmSellLabel;
