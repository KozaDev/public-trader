import { ListElement } from "styles/components";
import PropTypes from "prop-types";

const UserLabel = ({ username }) => {
  return (
    <ListElement>
      <div>{username}</div>
    </ListElement>
  );
};

UserLabel.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserLabel;
