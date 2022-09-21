import styled from "styled-components";

const StyledLayout = styled.div`
  padding: 20px;
  max-width: 968px;
  margin: auto auto 300px;

  main {
    margin: 20px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0;
  }
`;

export default StyledLayout;
