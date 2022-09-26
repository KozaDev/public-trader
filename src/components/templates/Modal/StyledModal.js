import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  border-radius: 20px;
  overflow: auto;
  width: ${({ ignoreDefaultSize }) => (ignoreDefaultSize ? null : "55%")};

  @media (max-width: ${({ theme }) => theme.breakpoints.extraLarge}) {
    width: ${({ ignoreDefaultSize }) => (ignoreDefaultSize ? null : "75%")};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    width: ${({ ignoreDefaultSize }) => (ignoreDefaultSize ? null : "85%")};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;

export default StyledModal;
