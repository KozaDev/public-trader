import NumberFormat from "react-number-format";

const Dollar = ({ amount }) => {
  return (
    <NumberFormat
      value={Number(amount).toFixed(2)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />
  );
};

export default Dollar;
