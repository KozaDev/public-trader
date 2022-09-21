import { CartContextProvider } from "lib/contexts/cartContext";
import Cart from "components/organisms/Cart/Cart";
import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "components/atoms/Dollar/Dollar";
import { StyledResponsiveTemplate } from "styles/components";
import ComponentError from "../ComponentError/ComponentError";
import Spinner from "components/templates/Spinner/Spinner";
import PropTypes from "prop-types";
import { userShape } from "lib/proptypes/proptypes";

const MarketDetails = ({ coin, user }) => {
  const { data: coinPrices, error: coinError } = usePricesState();
  if (coinError.isError) return <ComponentError error={coinError.error} />;
  if (!coinPrices) return <Spinner margin={"300px 0"} />;

  const coinPrice = coinPrices[coin.key];

  const walletId = user?.wallet?.id;
  const userId = user?.id;

  const usersDollars = () => {
    if (user) {
      return user.wallet.assets.find(({ key }) => key === "usd")?.amount;
    }
    return null;
  };

  return (
    <StyledResponsiveTemplate>
      <div className="flex-wrapper">
        <h2>
          Current {coin.currency} price: <Dollar amount={coinPrice} />
        </h2>
        <CartContextProvider
          userId={userId}
          walletId={walletId}
          coin={coin}
          coinPrice={coinPrice}
          usersDollars={usersDollars()}
        >
          <Cart />
        </CartContextProvider>
      </div>
    </StyledResponsiveTemplate>
  );
};

MarketDetails.propTypes = {
  coin: PropTypes.shape({
    key: PropTypes.string,
    currency: PropTypes.string,
  }),
  user: userShape,
};

export default MarketDetails;
