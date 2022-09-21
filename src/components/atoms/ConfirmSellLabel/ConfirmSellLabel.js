import { confirmLabelsProps } from "lib/proptypes/proptypes";

const ConfirmSellLabel = ({ amountOfCoin, coinName, coinPrice }) => (
  <div>
    <>{`Do you want to sell ${amountOfCoin} of ${coinName} for 
      ${(coinPrice * amountOfCoin).toFixed(2)}`}</>
  </div>
);

ConfirmSellLabel.propTypes = { confirmLabelsProps };

export default ConfirmSellLabel;
