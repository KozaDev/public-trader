import { confirmLabelsProps } from "lib/proptypes/proptypes";

const ConfirmSellLabel = ({ amountOfCoin, coinName, coinPrice }) => (
  <p>
    <>{`Do you want to sell ${amountOfCoin} of ${coinName} for 
      ${(coinPrice * amountOfCoin).toFixed(2)}`}</>
  </p>
);

ConfirmSellLabel.prototype = confirmLabelsProps;

export default ConfirmSellLabel;
