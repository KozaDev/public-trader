import styled from "styled-components";

const StyledList = styled.div`
  li:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "")};
  }
`;

export default StyledList;
