import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

const Dollar = ({ amount, displayPrefix }) => {
  return (
    <>
      {displayPrefix && <>{"USD "}</>}
      <NumberFormat
        value={Number(amount).toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={!displayPrefix && "$"}
      />
    </>
  );
};

Dollar.prototype = {
  amount: PropTypes.number.isRequired,
  displayPrefix: PropTypes.bool,
};

export default Dollar;
