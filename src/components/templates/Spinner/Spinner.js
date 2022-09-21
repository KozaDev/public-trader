const { TailSpin } = require("react-loader-spinner");
const { theme } = require("styles/theme");

const Spinner = ({ width, height, margin }) => {
  return (
    <div style={{ margin }}>
      <TailSpin
        height={height}
        width={width || "100%"}
        color={theme.colors.primaryBlue}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Spinner;
