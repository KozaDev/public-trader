import Position from "../../molecules/Position/Position";

const Positions = ({ positions: { data }, walletId }) => {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map(({ id, attributes }) => (
            <li key={id}>
              <Position details={{ positionId: id, walletId, ...attributes }} />
            </li>
          ))}
        </ul>
      ) : (
        <h2>This user dosen't have any positions</h2>
      )}
    </div>
  );
};

export default Positions;
