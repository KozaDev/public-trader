import styled from "styled-components";

const StyledDummyUsers = styled.div`
  margin: 80px 0;

  table {
    margin: 20px 0;
    width: 60%;
    th,
    td {
      text-align: left;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    table {
      width: 100%;
    }
  } ;
`;

export default StyledDummyUsers;
