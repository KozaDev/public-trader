import { usePricesState } from "lib/contexts/pricesProvider";
import Coin from "../Coin/Coin";
import PropTypes from "prop-types";

const PositionValue = ({
  createdAt,
  updatedAt,
  priceOnExit,
  amountOfCoin,
  coin,
}) => {
  const { data, error } = usePricesState();

  if (error.isError) return "?";
  if (!data) return "...";

  const isPositionOpen = updatedAt === createdAt;
  const ultimatePrice = isPositionOpen ? data[coin] : priceOnExit;

  return (
    <Coin coin={"usd"} amount={ultimatePrice * amountOfCoin} displayUsdPrefix />
  );
};

PositionValue.propTypes = {
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  priceOnExit: PropTypes.number,
  amountOfCoin: PropTypes.number.isRequired,
  coin: PropTypes.string.isRequired,
};

export default PositionValue;
