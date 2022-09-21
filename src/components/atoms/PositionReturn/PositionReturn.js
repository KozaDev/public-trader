import { usePricesState } from "lib/contexts/pricesProvider";
import StyledPositionReturn from "./StyledPositionReturn";
import PropTypes from "prop-types";
const PositionReturn = ({
  updatedAt,
  createdAt,
  priceOnEntry,
  priceOnExit,
  coin,
}) => {
  const { data, error } = usePricesState();

  if (error.isError) return "?";
  if (!data) return "...";

  const isPositionOpen = updatedAt === createdAt;
  const ultimatePrice = isPositionOpen ? data[coin] : priceOnExit;
  const currentReturn = ((ultimatePrice / priceOnEntry) * 100 - 100).toFixed(1);

  return (
    <StyledPositionReturn>
      {currentReturn < 0 ? (
        <span className="red">{currentReturn}%</span>
      ) : (
        <span className="green">{currentReturn}%</span>
      )}
    </StyledPositionReturn>
  );
};

PositionReturn.propTypes = {
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  priceOnEntry: PropTypes.number.isRequired,
  priceOnExit: PropTypes.number,
  coin: PropTypes.string,
};

export default PositionReturn;
