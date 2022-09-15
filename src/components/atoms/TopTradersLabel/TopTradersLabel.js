import NumberFormat from "react-number-format";
import { ListElement } from "styles/components";

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

export default TopTradersLabel;
