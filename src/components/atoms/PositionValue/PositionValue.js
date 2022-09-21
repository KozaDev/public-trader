import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "../Dollar/Dollar";
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

  return <Dollar amount={ultimatePrice * amountOfCoin} />;
};

PositionValue.propTypes = {
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  priceOnExit: PropTypes.number,
  amountOfCoin: PropTypes.number.isRequired,
  coin: PropTypes.string.isRequired,
};

export default PositionValue;
