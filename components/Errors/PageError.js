import { StyledError } from "./StyledError";

const PageError = ({ error }) => {
  return (
    <StyledError>
      <h1>{error.message}</h1>
      <h3>{error.status && <>{`Status code: ${error.status}`}</>}</h3>
    </StyledError>
  );
};

export default PageError;
