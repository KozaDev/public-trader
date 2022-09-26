import { useState, useEffect } from "react";
import Modal from "components/templates/Modal/Modal";
import { StyledButton, StyledCofirmContent } from "styles/components";

const useCustomConfirm = ({ Component, onConfirm, accept, refuse }) => {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [confirmed, setConfirm] = useState(false);

  useEffect(() => {
    if (confirmed) {
      onConfirm();
      setConfirm(false);
    }
  }, [confirmed]);

  const confirmAction = () => {
    setConfirm(true);
    setDisplayConfirm(false);
  };

  const attachCustomConfirm = () => {
    if (displayConfirm)
      return (
        <Modal ignoreDefaultSize={true}>
          <StyledCofirmContent>
            <div>
              <div className="component">{Component}</div>
              <div className="buttons">
                <StyledButton onClick={confirmAction}>{accept}</StyledButton>
                <StyledButton onClick={() => setDisplayConfirm(false)}>
                  {refuse}
                </StyledButton>
              </div>
            </div>
          </StyledCofirmContent>
        </Modal>
      );
  };

  return {
    attachCustomConfirm,
    displayConfirm: setDisplayConfirm.bind(null, true),
  };
};

export default useCustomConfirm;
