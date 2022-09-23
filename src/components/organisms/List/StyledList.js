import styled from "styled-components";

const StyledList = styled.div`
  .grey-header {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  li:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "")};
  }
`;

export default StyledList;
