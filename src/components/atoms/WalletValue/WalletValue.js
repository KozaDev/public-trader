import { usePricesState } from "lib/contexts/pricesProvider";
import { allAssetsToDollars } from "lib/utils/utils";
import Dollar from "../Dollar/Dollar";

const WalletValue = ({ assets, title }) => {
  const { data, error } = usePricesState();

  if (error.isError) return "?";
  if (!data) return "...";
  const value = allAssetsToDollars(assets, data);
  return (
    <h2>
      {title} <Dollar amount={value} />
    </h2>
  );
};

export default WalletValue;
