import uuid from "react-uuid";
import StyledDummyUsers from "./StyledDummyUsers";

const DummyUsers = ({ title, data }) => {
  return (
    <StyledDummyUsers>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ attributes: { username, password } }) => (
            <tr key={uuid()}>
              <td>{username}</td>
              <td>{password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledDummyUsers>
  );
};

export default DummyUsers;
