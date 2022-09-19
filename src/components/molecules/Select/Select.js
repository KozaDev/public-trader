import StyledSelect from "./StyledSelect";

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

export default Select;
