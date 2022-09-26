import { isMobile } from "react-device-detect";

const BlockMobile = ({ children, message }) => {
  if (isMobile) {
    return <div> {message}</div>;
  }
  return children;
};

export default BlockMobile;
