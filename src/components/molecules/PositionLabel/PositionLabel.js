import StyledPositionLabel from "./StyledPositionLabel";
import Moment from "react-moment";
import PositionReturn from "../../atoms/PositionReturn/PositionReturn";
import PositionValue from "components/atoms/PositionValue/PositionValue";

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
    <Moment date={updatedAt} format="YYYY-MM-DD" />
  );

  return (
    <StyledPositionLabel>
      <div className="flex-wrapper">
        <h3>
          {coin.toUpperCase()}
          {" - USD "}
          <PositionReturn
            updatedAt={updatedAt}
            createdAt={createdAt}
            priceOnEntry={priceOnEntry}
            priceOnExit={priceOnExit}
            coin={coin}
          />
        </h3>
        <h3>
          <Moment date={createdAt} format="YYYY-MM-DD" /> - {exitDate}
        </h3>
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

export default PositionLabel;
