import StyledSelect from "./StyledSelect";
import uuid from "react-uuid";

const Select = ({ options, handleChange }) => {
  return (
    <StyledSelect onChange={handleChange}>
      {options.map(({ title, value, attributes }) => {
        return (
          <option {...attributes} value={value} key={uuid()}>
            {title}
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default Select;
