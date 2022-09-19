import styled from "styled-components";
import { rgba, darken } from "polished";

const StyledSelect = styled.select`
  font-size: inherit;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  padding: 3px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0;
  &:hover {
    cursor: pointer;
  }

  option:disabled {
    color: ${({ theme }) => darken(0.15, theme.colors.whiteSmoke)};
  }
`;

export default StyledSelect;
