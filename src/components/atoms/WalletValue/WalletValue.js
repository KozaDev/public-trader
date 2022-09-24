import { usePricesState } from "lib/contexts/pricesProvider";
import { assetsShape } from "lib/proptypes/proptypes";
import { allAssetsToDollars } from "lib/utils/utils";
import Coin from "../Coin/Coin";
import PropTypes from "prop-types";

const WalletValue = ({ assets, title }) => {
  const { data, error } = usePricesState();

  if (error.isError) return "?";
  if (!data) return "...";
  const value = allAssetsToDollars(assets, data);
  return (
    <h2>
      {title} <Coin coin={"usd"} amount={value} displayUsdPrefix />
    </h2>
  );
};

WalletValue.propTypes = {
  assets: assetsShape,
  title: PropTypes.string.isRequired,
};

export default WalletValue;
