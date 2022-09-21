import { usePricesState } from "lib/contexts/pricesProvider";
import { assetsShape } from "lib/proptypes/proptypes";
import { allAssetsToDollars } from "lib/utils/utils";
import Dollar from "../Dollar/Dollar";
import PropTypes from "prop-types";

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

WalletValue.propTypes = {
  assets: assetsShape,
  title: PropTypes.string.isRequired,
};

export default WalletValue;
