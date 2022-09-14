import Position from "../Position/Position";
import StyledPositions from "./StyledPosition";
import Link from "next/link";

const Positions = ({ positions: { data }, userId }) => {
  return (
    <StyledPositions>
      {data.length > 0 ? (
        <>
          <h2>Positions</h2>
          <ul>
            {data.map(({ id, attributes }) => (
              <li key={id}>
                <Link href={`/users/${userId}/position/${id}`}>
                  See position
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>This user dosen't have any positions</h2>
      )}
    </StyledPositions>
  );
};

export default Positions;
