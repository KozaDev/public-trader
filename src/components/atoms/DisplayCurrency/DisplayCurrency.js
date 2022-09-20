import Dollar from "../Dollar/Dollar";
import Coin from "../Coin/Coin";

const DisplayCurrency = ({ amount, coin, displayPrefix }) => {
  const isItDollar = coin === "usd";
  return (
    <>
      {isItDollar ? (
        <Dollar amount={amount} displayPrefix={!!displayPrefix} />
      ) : (
        <Coin
          amount={amount}
          coin={coin}
          displayPrefix={!!displayPrefix}
          layPrefix
        />
      )}
    </>
  );
};

export default DisplayCurrency;
