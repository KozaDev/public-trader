import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "../Dollar/Dollar";

const PositionExitPrice = ({ priceOnExit, coin }) => {
  if (priceOnExit) return <Dollar amount={priceOnExit} />;

  const { data, error } = usePricesState();

  if (error.isError) return "?";
  if (!data) return "...";

  return <Dollar amount={data[coin]} />;
};

export default PositionExitPrice;
