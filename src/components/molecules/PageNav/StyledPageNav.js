import styled from "styled-components";

const StyledPageNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;

  .pages {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    min-width: 200px;
    margin: 0 15px;
    font-weight: 500;
  }

  .pages span {
    padding: 10px;
  }

  .current-page {
    transition: 100ms;
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    .pages {
      display: inline-flex;
      justify-content: space-around;
      min-width: 150px;
    }
  } ;
`;

export default StyledPageNav;
