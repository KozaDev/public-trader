import styled from "styled-components";
import { rgba } from "polished";

const StyledSelect = styled.select`
  font-size: inherit;
  outline: none;
  border: none;
  background-color: ${({ theme }) => rgba(theme.colors.primaryBlue, 1)};
  padding: 3px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export default StyledSelect;
