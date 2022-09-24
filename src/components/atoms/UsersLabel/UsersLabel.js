import { ListElement } from "styles/components";
import PropTypes from "prop-types";

const UserLabel = ({ username }) => {
  return (
    <ListElement>
      <h3>{username}</h3>
    </ListElement>
  );
};

UserLabel.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserLabel;
