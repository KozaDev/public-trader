const ConfirmPurchaseLabel = ({ amountOfCoin, coinName, coinPrice }) => (
  <p>
    <>{`Do you want buy ${amountOfCoin} of ${coinName} for 
    ${(coinPrice * amountOfCoin).toFixed(2)}`}</>
  </p>
);

export default ConfirmPurchaseLabel;
