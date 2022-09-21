import StyledSelect from "./StyledSelect";
import PropTypes from "prop-types";
import uuid from "react-uuid";

const Select = ({ options, handleChange }) => {
  const defaultValue = options.reduce((acc, item) => {
    if (item.attributes.selected) return item.value;
    return acc;
  }, options[0].value);

  return (
    <StyledSelect value={defaultValue} onChange={handleChange}>
      {options.map(({ title, value, attributes }) => {
        delete attributes.selected;
        return (
          <option key={uuid()} {...attributes} value={value}>
            {title}
          </option>
        );
      })}
    </StyledSelect>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Select;
