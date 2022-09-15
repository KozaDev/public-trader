import NumberFormat from "react-number-format";
import { decimalPlaces } from "lib/consts/consts";
import { CartContextProvider } from "lib/contexts/cartContext";
import Cart from "components/organisms/Cart/Cart";
import { usePricesState } from "lib/contexts/pricesProvider";
import PageError from "components/templates/PageError/PageError";
import { StyledCard } from "styles/components";

const MarketDetails = ({ coin, user }) => {
  const { data: coinPrices, error: coinError } = usePricesState();

  if (coinError.isError) return <PageError error={coinError.error} />;
  if (!coinPrices) return "Loading...";

  const coinPrice = coinPrices[coin.key];

  const walletId = user?.wallet?.id;
  const userId = user?.id;

  const displayUsersDollars = () => {
    if (user) {
      const usersDollars = user.wallet.assets.reduce((acc, item) => {
        if (item.key === "usd") return item.amount;
        return acc;
      }, 0);
      return (
        <NumberFormat
          value={Number(usersDollars).toFixed(decimalPlaces["usd"])}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    }
    return null;
  };

  return (
    <StyledCard>
      <h2>
        Current {coin.currency} price:{" "}
        <NumberFormat
          value={Number(coinPrice).toFixed(decimalPlaces["usd"])}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </h2>
      <CartContextProvider
        userId={userId}
        walletId={walletId}
        coin={coin}
        coinPrice={coinPrice}
      >
        <Cart />
      </CartContextProvider>
      {displayUsersDollars()}
    </StyledCard>
  );
};

export default MarketDetails;
