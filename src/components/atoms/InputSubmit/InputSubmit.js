import PropTypes from "prop-types";
const InputSubmit = (props) => {
  if (props.disabled)
    return <input type={"submit"} {...{ props, value: "Loading..." }} />;
  return <input type={"submit"} {...props} />;
};

InputSubmit.propTypes = {
  disabled: PropTypes.bool,
};

export default InputSubmit;
