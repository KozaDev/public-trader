import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "../Dollar/Dollar";
import PropTypes from "prop-types";

const PositionExitPrice = ({ priceOnExit, coin }) => {
  const { data, error } = usePricesState();

  if (priceOnExit) return <Dollar amount={priceOnExit} />;

  if (error.isError) return "?";
  if (!data) return "...";

  return <Dollar amount={data[coin]} />;
};

PositionExitPrice.propTypes = {
  priceOnExit: PropTypes.number.isRequired,
  coin: PropTypes.string.isRequired,
};
export default PositionExitPrice;
