import { confirmLabelsProps } from "lib/proptypes/proptypes";
import Coin from "../Coin/Coin";

const ConfirmSellLabel = ({ amountOfCoin, coin, coinPrice }) => {
  console.log({ amountOfCoin, coin, coinPrice });
  return (
    <div>
      <>{"Do you want to sell "}</>
      <Coin amount={amountOfCoin} coin={coin.key} />
      <>{` for `}</>
      <Coin amount={coinPrice * amountOfCoin} coin={"usd"} displayPrefix />
      <>{"?"}</>
    </div>
  );
};

ConfirmSellLabel.propTypes = { confirmLabelsProps };

export default ConfirmSellLabel;
