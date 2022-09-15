import NumberFormat from "react-number-format";

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

export default Dollar;
