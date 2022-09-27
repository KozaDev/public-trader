import { rgba } from "polished";
import styled from "styled-components";

const StyledTable = styled.table`
  margin: 20px 0;
  width: 100%;
  min-height: 450px;

  tbody tr:hover {
    background-color: ${({ theme }) => rgba(theme.colors.primaryBlue, 0.05)};
  }

  th,
  td {
    font-weight: 700;
    text-align: center;
  }
  .green {
    color: ${({ theme }) => theme.colors.success};
  }
  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .change-in-percents {
    width: 150px;
  }
  .price-in-usd {
    width: 200px;
  }
`;

export const StyledTradingTable = styled.div`
  min-height: 450px;
`;

export default StyledTable;
