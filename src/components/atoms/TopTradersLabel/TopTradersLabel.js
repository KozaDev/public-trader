import NumberFormat from "react-number-format";

const UserLabel = ({ username, allAssetsInDollars }) => {
  return (
    <div>
      {username}{" "}
      <NumberFormat
        value={allAssetsInDollars}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default UserLabel;
