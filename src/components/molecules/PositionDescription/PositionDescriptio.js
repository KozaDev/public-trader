import Link from "next/link";
import StyledPositionDescription from "./StyledPositionDescription";
import PropTypes from "prop-types";

const PositionDescription = ({ description, ownerName, ownerId }) => {
  return (
    <StyledPositionDescription>
      <Link href={`/users/${ownerId}`}>
        <h4>{ownerName}</h4>
      </Link>
      <p>{description}</p>
    </StyledPositionDescription>
  );
};

PositionDescription.propTypes = {
  description: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerId: PropTypes.number.isRequired,
};

export default PositionDescription;
