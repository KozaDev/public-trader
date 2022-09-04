import { StyledError } from "../../../styles/StyledError";

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

export default FormError;
