import styled from "styled-components";
import { StyledCard } from "styles/components";

const StyledWallet = styled(StyledCard)`
  padding: 20px;
  margin: 20px 0;

  h4 {
    margin: 20px 0;
  }
  ul li {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: 5px 0;
  }

  .label {
    padding: 1px 3px;
    border-radius: 10px;
  }

  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .green {
    color: ${({ theme }) => theme.colors.success};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.smallMobile}) {
    ul li {
      font-size: ${({ theme }) => theme.fontSize.l};
    }
  } ;
`;

export default StyledWallet;
