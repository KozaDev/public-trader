import Link from "next/link";
import StyledPositionDescription from "./StyledPositionDescription";

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

export default PositionDescription;
