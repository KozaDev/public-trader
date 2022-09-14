import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "../Dollar/Dollar";

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

export default PositionValue;
