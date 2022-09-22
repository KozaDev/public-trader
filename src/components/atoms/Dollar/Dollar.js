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

Dollar.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  displayPrefix: PropTypes.bool,
};

export default Dollar;
