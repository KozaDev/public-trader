import StyledPositionDetails from "./StyledPositionDetails";
import Dollar from "components/atoms/Dollar/Dollar";
import PositionReturn from "components/atoms/PositionReturn/PositionReturn";
import PositionValue from "components/atoms/PositionValue/PositionValue";
import PositionExitPrice from "components/atoms/PositionExitPrice/PositionExitPrice";
import PositionDescription from "components/molecules/PositionDescription/PositionDescriptio";
import Coin from "components/atoms/Coin/Coin";

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
  const priceOnExitLabel = isPositionOpen
    ? "Current price: "
    : "Price on exit: ";

  return (
    <StyledPositionDetails>
      <h2>{"Description"}</h2>
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
        {"Price on entry: "}
        <Dollar amount={priceOnEntry} />
      </h4>
      <h4>
        {priceOnExitLabel}
        <PositionExitPrice priceOnExit={priceOnExit} coin={coin} />
      </h4>
    </StyledPositionDetails>
  );
};

export default PositionDetails;
