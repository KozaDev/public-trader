import styled from "styled-components";

export const StyledButton = styled.button`
  all: initial;
  font-family: inherit;
  font-weight: 600;
  border-bottom: ${({ theme }) => theme.colors.black} solid 2px;
`;

export const StyledCard = styled.div`
  border-radius: ${({ theme }) => theme.variables.borderRadious};
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  box-shadow: 1px 1px 12px 0px rgba(0, 0, 0, 0.15);
`;

export const StyledResponsiveTemplate = styled(StyledCard)`
  padding: 50px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    padding: 20px;

    & > * {
      width: 100%;
    }
  } ;
`;

export const StyledFrom = styled.form`
  width: 100%;
  div {
    margin: 10px 0;
  }

  label {
    display: block;
    font-weight: 700;
  }

  input[type="number"],
  input[type="text"],
  input[type="password"],
  input[type="email"],
  textarea {
    all: initial;
    box-sizing: border-box;
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.white};
    margin: 5px 0;
    padding: 8px;
    border-radius: 8px;
    width: 100%;
  }

  input[type="submit"] {
    all: initial;
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    font-family: inherit;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 5px 15px;
  }

  input[type="submit"]:hover {
    cursor: pointer;
  }

  input[type="submit"]:disabled {
    cursor: default;
  }

  input:focus-within,
  textarea:focus-within {
    outline: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const ListElement = styled.div`
  padding: 10px;
  margin: 10px 0;
`;
