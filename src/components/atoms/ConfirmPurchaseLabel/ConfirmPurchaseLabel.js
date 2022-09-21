import { confirmLabelsProps } from "lib/proptypes/proptypes";

const ConfirmPurchaseLabel = ({ amountOfCoin, coinName, coinPrice }) => (
  <div>
    <>{`Do you want buy ${amountOfCoin} of ${coinName} for 
    ${(coinPrice * amountOfCoin).toFixed(2)}`}</>
  </div>
);

ConfirmPurchaseLabel.prototype = confirmLabelsProps;

export default ConfirmPurchaseLabel;
