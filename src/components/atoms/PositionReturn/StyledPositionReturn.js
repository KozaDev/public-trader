import styled from "styled-components";

const StyledPositionReturn = styled.span`
  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .green {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export default StyledPositionReturn;
