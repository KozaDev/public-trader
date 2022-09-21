import StyledPositionLabel from "./StyledPositionLabel";
import Moment from "react-moment";
import PositionReturn from "../../atoms/PositionReturn/PositionReturn";
import PositionValue from "components/atoms/PositionValue/PositionValue";
import Coin from "components/atoms/Coin/Coin";
import PropTypes from "prop-types";
import { stringOrNumber } from "lib/proptypes/proptypes";

const PositionLabel = ({ attributes }) => {
  const {
    coin,
    createdAt,
    updatedAt,
    priceOnEntry,
    priceOnExit,
    amountOfCoin,
  } = attributes;

  const isPositionOpen = createdAt === updatedAt;

  const exitDate = isPositionOpen ? (
    "now"
  ) : (
    <Moment date={updatedAt} format="DD MMM, YY" />
  );

  return (
    <StyledPositionLabel>
      <div className="flex-wrapper">
        <div>
          <h3>
            <Coin amount={amountOfCoin} coin={coin} displayPrefix={true} />{" "}
          </h3>

          <h5>
            {"Return "}
            <PositionReturn
              updatedAt={updatedAt}
              createdAt={createdAt}
              priceOnEntry={priceOnEntry}
              priceOnExit={priceOnExit}
              coin={coin}
            />
          </h5>
        </div>

        <h5>
          <Moment date={createdAt} format="DD MMM, YY" /> - {exitDate}
        </h5>
      </div>
      <h5>
        {isPositionOpen ? "Current value: " : "Value on exit: "}
        <PositionValue
          createdAt={createdAt}
          updatedAt={updatedAt}
          priceOnExit={priceOnExit}
          amountOfCoin={amountOfCoin}
          coin={coin}
        />
      </h5>
      <h5>See all details</h5>
    </StyledPositionLabel>
  );
};

PositionLabel.propTypes = {
  attributes: PropTypes.shape({
    coin: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    priceOnEntry: PropTypes.number.isRequired,
    priceOnExit: PropTypes.number,
    amountOfCoin: stringOrNumber,
  }),
};

export default PositionLabel;
