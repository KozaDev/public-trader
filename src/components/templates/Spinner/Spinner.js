import { TailSpin } from "react-loader-spinner";
import { theme } from "styles/theme";
import PropTypes from "prop-types";

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

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
};
export default Spinner;
