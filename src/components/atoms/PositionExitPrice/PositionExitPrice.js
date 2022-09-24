import { usePricesState } from "lib/contexts/pricesProvider";
import PropTypes from "prop-types";
import Coin from "../Coin/Coin";

const PositionExitPrice = ({ priceOnExit, coin }) => {
  const { data, error } = usePricesState();

  if (priceOnExit)
    return <Coin coin={"usd"} amount={priceOnExit} displayUsdPrefix />;

  if (error.isError) return "?";
  if (!data) return "...";

  return <Coin coin={"usd"} amount={data[coin]} displayUsdPrefix />;
};

PositionExitPrice.propTypes = {
  priceOnExit: PropTypes.number.isRequired,
  coin: PropTypes.string.isRequired,
};
export default PositionExitPrice;
