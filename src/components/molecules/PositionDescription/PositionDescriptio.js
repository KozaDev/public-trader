import Link from "next/link";
import StyledPositionDescription from "./StyledPositionDescription";

const PositionDescription = ({ description, ownerName, ownerId }) => {
  return (
    <StyledPositionDescription>
      <p>{description}</p>
      <Link href={`/users/${ownerId}`}>
        <a>{ownerName}</a>
      </Link>
    </StyledPositionDescription>
  );
};

export default PositionDescription;
