import { ListElement } from "styles/components";
import Coin from "../Coin/Coin";
import PropTypes from "prop-types";

const TopTradersLabel = ({ username, allAssetsInDollars }) => {
  return (
    <ListElement>
      <div>{username} </div>
      <Coin coin="usd" amount={allAssetsInDollars} displayUsdPrefix />
    </ListElement>
  );
};

TopTradersLabel.propTypes = {
  username: PropTypes.string.isRequired,
  allAssetsInDollars: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default TopTradersLabel;
