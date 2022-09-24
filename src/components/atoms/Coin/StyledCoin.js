import styled from "styled-components";

const StyledCoin = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .icon,
  .prefix,
  .amount {
    margin-right: 5px;
  }
`;
export default StyledCoin;
