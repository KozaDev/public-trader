import { rgba } from "polished";
import styled from "styled-components";

const StyledDummyUsers = styled.div`
  margin: 80px 0;
  table {
    margin: 20px 0;
    width: 50%;

    tbody tr:hover {
      background-color: ${({ theme }) => rgba(theme.colors.primaryBlue, 0.05)};
    }

    th,
    td {
      text-align: left;
    }
  }
`;

export default StyledDummyUsers;
