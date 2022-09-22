import StyledDummyUsers from "./StyledDummyUsers";
const DummyUsers = () => {
  return (
    <StyledDummyUsers>
      <h3>{"Use this credentials to login and trade"}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tr>
          <td>Jan Kowalski</td>
          <td>jankowalski</td>
        </tr>
        <tr>
          <td>Walter Jones</td>
          <td>walterjones</td>
        </tr>
        <tr>
          <td>Helen Rhem</td>
          <td>helenrhem</td>
        </tr>
        <tr>
          <td>Amy Nesbit</td>
          <td>amynesbit</td>
        </tr>
      </table>
    </StyledDummyUsers>
  );
};

export default DummyUsers;
