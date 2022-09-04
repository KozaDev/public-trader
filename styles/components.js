import styled from "styled-components";

export const StyledButton = styled.button`
  all: initial;
  font-family: inherit;
  font-weight: 600;
  border-bottom: ${({ theme }) => theme.colors.black} solid 2px;
  /* background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: ${({ theme }) => theme.variables.borderRadious}; */
`;

export const StyledCard = styled.div`
  border-radius: ${({ theme }) => theme.variables.borderRadious};
  padding: 10px;
  margin: 10px 0;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
`;

export const StyledFrom = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin: 50px auto;
  padding: 40px;
  background-color: whitesmoke;
  border-radius: ${({ theme }) => theme.variables.borderRadious};

  & > div {
    margin: 30px 0 0 0;
  }

  input {
    all: initial;
    font-family: inherit;
    font-size: inherit;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"] {
    outline: 1px solid black;
    border-radius: 10px;
    padding: 3px;
  }

  input[type="submit"] {
    margin: 20px 0;
    padding: 8px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }

  input[type="submit"]:hover {
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    width: 100%;
    margin: 0;
    background-color: inherit;
  } ;
`;
