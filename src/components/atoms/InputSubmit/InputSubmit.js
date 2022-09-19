const InputSubmit = (props) => {
  if (props.disabled)
    return <input type={"submit"} {...{ props, value: "Loading..." }} />;
  return <input type={"submit"} {...props} />;
};

export default InputSubmit;
