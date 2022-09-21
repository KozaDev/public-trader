import StyledSelect from "./StyledSelect";
import PropTypes from "prop-types";
const Select = ({ options, handleChange }) => {
  return (
    <>
      <StyledSelect onChange={handleChange}>
        {options.map(({ title, value, attributes }) => {
          return (
            <option {...attributes} value={value}>
              {title}
            </option>
          );
        })}
      </StyledSelect>
    </>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Select;
