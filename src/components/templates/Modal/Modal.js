import StyledModal, { Overlay } from "./StyledModal";

const Modal = ({ children, ignoreDefaultSize }) => {
  return (
    <>
      <StyledModal ignoreDefaultSize={ignoreDefaultSize}>
        {children}
      </StyledModal>
      <Overlay />
    </>
  );
};

export default Modal;
