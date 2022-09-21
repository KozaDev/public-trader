import { StyledError } from "../../../styles/StyledError";
import PropTypes from "prop-types";
import { errorShape } from "lib/proptypes/proptypes";

const FormError = ({ error }) => {
  return (
    <StyledError>
      {error.details?.errors ? (
        <ul>
          {error.details.errors.map(({ message }) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>{error.message}</li>
        </ul>
      )}
    </StyledError>
  );
};

FormError.propTypes = {
  error: {
    details: PropTypes.any,
    ...errorShape,
  },
};

export default FormError;
