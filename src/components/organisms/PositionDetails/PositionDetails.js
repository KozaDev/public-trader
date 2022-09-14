import StyledPositionDetails from "./StyledPositionDetails";
import Dollar from "components/atoms/Dollar/Dollar";
import PositionReturn from "components/atoms/PositionReturn/PositionReturn";
import PositionValue from "components/atoms/PositionValue/PositionValue";
import PositionExitPrice from "components/atoms/PositionExitPrice/PositionExitPrice";
import PositionDescription from "components/molecules/PositionDescription/PositionDescriptio";

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
      <PositionDescription
        description={description}
        ownerName={owner.username}
        ownerId={owner.id}
      />

      <h5>
        {"Price on entry: "}
        <Dollar amount={priceOnEntry} />
      </h5>
      <h5>
        {priceOnExitLabel}
        <PositionExitPrice priceOnExit={priceOnExit} coin={coin} />
      </h5>

      <h5>
        {"Return: "}
        <PositionReturn
          createdAt={createdAt}
          updatedAt={updatedAt}
          priceOnEntry={priceOnEntry}
          priceOnExit={priceOnExit}
          coin={coin}
        />
      </h5>

      <h5>
        {"Value: "}
        <PositionValue
          createdAt={createdAt}
          updatedAt={updatedAt}
          priceOnExit={priceOnExit}
          amountOfCoin={amountOfCoin}
          coin={coin}
        />
      </h5>
    </StyledPositionDetails>
  );
};

export default PositionDetails;
