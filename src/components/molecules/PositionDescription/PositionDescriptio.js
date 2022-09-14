import Link from "next/link";

const PositionDescription = ({ description, ownerName, ownerId }) => {
  return (
    <p>
      {description}
      <h5>
        <Link href={`/users/${ownerId}`}>
          <a>{ownerName}</a>
        </Link>
      </h5>
    </p>
  );
};

export default PositionDescription;
