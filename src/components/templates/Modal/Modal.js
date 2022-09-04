import StyledModal, { Overlay } from "./StyledModal";

const Modal = ({ children }) => {
  return (
    <>
      <StyledModal>{children}</StyledModal>
      <Overlay />
    </>
  );
};

export default Modal;
