import { ListElement } from "styles/components";
import PropTypes from "prop-types";

const UserLabel = ({ username }) => {
  return <ListElement>{username}</ListElement>;
};

UserLabel.propTypes = {
  username: PropTypes.string.func,
};

export default UserLabel;
