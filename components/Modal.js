import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 600px;
  width: 65%;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  padding: 20px 50px 20px 20px;
  border-radius: 20px;
  overflow: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.extraLarge}) {
    width: 75%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 85%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;

const Modal = ({ children }) => {
  return (
    <>
      <StyledModal>{children}</StyledModal>
      <Overlay />
    </>
  );
};

export default Modal;
