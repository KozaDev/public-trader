import NumberFormat from "react-number-format";
import { ListElement } from "styles/components";
import PropTypes from "prop-types";
const TopTradersLabel = ({ username, allAssetsInDollars }) => {
  return (
    <ListElement>
      {username}{" "}
      <NumberFormat
        value={allAssetsInDollars}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </ListElement>
  );
};

TopTradersLabel.propTypes = {
  username: PropTypes.string.isRequired,
  allAssetsInDollars: PropTypes.number.isRequired,
};

export default TopTradersLabel;
