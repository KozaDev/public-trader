import styled from "styled-components";

const StyledPageNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;

  span {
    margin: 0 15px;
    font-weight: 500;
  }

  .pages {
    display: inline-flex;
    justify-content: space-around;
    min-width: 250px;
  }

  .pages span {
    padding: 6px;
    border-radius: 8px;
  }

  .current-page {
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    .pages {
      display: inline-flex;
      justify-content: space-around;
      min-width: 180px;
    }
  } ;
`;

export default StyledPageNav;
