const Select = ({ options, handleChange }) => {
  return (
    <>
      <select onChange={handleChange}>
        {options.map(({ title, value, attributes }) => {
          return (
            <option {...attributes} value={value}>
              {title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
