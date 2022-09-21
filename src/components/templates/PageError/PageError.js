import { StyledError } from "../../../styles/StyledError";
import { errorShape } from "lib/proptypes/proptypes";
const PageError = ({ error }) => {
  return (
    <StyledError>
      <h1>{error.message}</h1>
      <h3>{error.status && <>{`Status code: ${error.status}`}</>}</h3>
    </StyledError>
  );
};

PageError.propTypes = {
  error: errorShape,
};

export default PageError;
