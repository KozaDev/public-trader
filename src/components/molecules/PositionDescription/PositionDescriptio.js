import Link from "next/link";

const PositionDescription = ({ description, ownerName, ownerId }) => {
  return (
    <p>
      {description}
      <h4>
        <Link href={`/users/${ownerId}`}>
          <a>{ownerName}</a>
        </Link>
      </h4>
    </p>
  );
};

export default PositionDescription;
