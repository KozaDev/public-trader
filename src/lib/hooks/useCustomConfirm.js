import { useState, useEffect } from "react";
import Modal from "components/templates/Modal/Modal";

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
        <Modal>
          {Component}
          <button onClick={confirmAction}>{accept}</button>
          <button onClick={() => setDisplayConfirm(false)}>{refuse}</button>
        </Modal>
      );
  };

  return {
    attachCustomConfirm,
    displayConfirm: setDisplayConfirm.bind(null, true),
  };
};

export default useCustomConfirm;
