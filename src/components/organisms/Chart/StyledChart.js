import styled from "styled-components";

const StyledChart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  margin: 0 0 50px 0;

  .drop-down {
    margin: 20px 0 0 0;

    select {
      margin: 5px 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    min-height: 250px;
  }
`;
export default StyledChart;
