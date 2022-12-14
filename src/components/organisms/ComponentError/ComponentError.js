import { errorShape } from "lib/proptypes/proptypes";
import StyledComponentError from "./StyledComponentError";

const ComponentError = ({ error }) => {
  return (
    <StyledComponentError>
      <h4>{error.message}</h4>
      <h4>{error.status && <>{`Status code: ${error.status}`}</>}</h4>
    </StyledComponentError>
  );
};

ComponentError.propTypes = {
  error: errorShape,
};

export default ComponentError;
