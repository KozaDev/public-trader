const Select = ({ options, handleChange }) => {
  return (
    <>
      <select onChange={handleChange}>
        {options.map(({ title, key, attributes }) => {
          return (
            <option {...attributes} value={key}>
              {title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
