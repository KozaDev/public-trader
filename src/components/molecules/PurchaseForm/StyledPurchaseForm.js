import styled from "styled-components";
import { StyledFrom } from "styles/components";

const StyledPurchaseForm = styled(StyledFrom)`
  .error {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export default StyledPurchaseForm;
