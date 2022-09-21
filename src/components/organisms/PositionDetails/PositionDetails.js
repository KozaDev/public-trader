import StyledPositionDetails from "./StyledPositionDetails";
import Dollar from "components/atoms/Dollar/Dollar";
import PositionReturn from "components/atoms/PositionReturn/PositionReturn";
import PositionValue from "components/atoms/PositionValue/PositionValue";
import PositionExitPrice from "components/atoms/PositionExitPrice/PositionExitPrice";
import PositionDescription from "components/molecules/PositionDescription/PositionDescriptio";
import Coin from "components/atoms/Coin/Coin";
import Moment from "react-moment";
import { positionShape } from "lib/proptypes/proptypes";

const PositionDetails = ({
  coin,
  createdAt,
  updatedAt,
  priceOnEntry,
  priceOnExit,
  amountOfCoin,
  description,
  owner,
}) => {
  const isPositionOpen = createdAt === updatedAt;

  console.log({
    coin,
    createdAt,
    updatedAt,
    priceOnEntry,
    priceOnExit,
    amountOfCoin,
    description,
    owner,
  });
  return (
    <StyledPositionDetails>
      <PositionDescription
        description={description}
        ownerName={owner.username}
        ownerId={owner.id}
      />

      <h2>{"Details"}</h2>

      <h4>
        <Coin amount={amountOfCoin} coin={coin} displayPrefix={true} />
      </h4>

      <h4>
        {"Value: "}
        <PositionValue
          createdAt={createdAt}
          updatedAt={updatedAt}
          priceOnExit={priceOnExit}
          amountOfCoin={amountOfCoin}
          coin={coin}
        />
      </h4>

      <h4>
        {"Return: "}
        <PositionReturn
          createdAt={createdAt}
          updatedAt={updatedAt}
          priceOnEntry={priceOnEntry}
          priceOnExit={priceOnExit}
          coin={coin}
        />
      </h4>

      <h4>
        {"Purchased at "}
        <Moment date={createdAt} format="YYYY-MM-DD hh:mm:ss A" />
        {" in price "}
        <Dollar amount={priceOnEntry} />
      </h4>
      <h4>
        {isPositionOpen ? (
          <>
            {"Current price "}
            <PositionExitPrice priceOnExit={priceOnExit} coin={coin} />
          </>
        ) : (
          <>
            {"Sold at "}
            <Moment date={updatedAt} format="YYYY-MM-DD hh:mm:ss A" />
            {" in price "}
            <PositionExitPrice priceOnExit={priceOnExit} coin={coin} />
          </>
        )}
        ;
      </h4>
    </StyledPositionDetails>
  );
};

PositionDetails.propTypes = positionShape;

export default PositionDetails;
