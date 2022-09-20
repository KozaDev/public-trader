import { css } from "styled-components";

export const baseButton = css`
  all: initial;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  font-family: inherit;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 5px 15px;
`;
