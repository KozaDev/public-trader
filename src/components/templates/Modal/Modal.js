import { nodeChild } from "lib/proptypes/proptypes";
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

Modal.propTypes = {
  children: nodeChild,
};

export default Modal;
