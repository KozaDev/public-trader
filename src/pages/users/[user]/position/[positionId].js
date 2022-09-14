import { errorMessages } from "lib/consts/consts";
import { errorFactory } from "lib/utils/errorHandlers";
import axios from "axios";
import PageError from "components/templates/PageError/PageError";
import Chart from "components/organisms/Chart";
import PositionDetails from "components/organisms/PositionDetails/PositionDetails";
import { useAuth } from "lib/contexts/authContext";

export async function getServerSideProps({ params }) {
  const { user: id, positionId } = params;
  let user = null;
  let position = null;

  const error = { isError: false, error: null };

  try {
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}?populate=positions`
    );

    if (!userResponse.data) throw new Error(errorMessages.notFound);

    const rigthPosition = userResponse.data.positions.find(
      ({ id }) => positionId == id
    );

    if (!rigthPosition) throw new Error(errorMessages.notFound);

    delete userResponse.data.positions;

    position = rigthPosition;
    user = userResponse.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(e);
  }
  return {
    props: {
      user,
      position,
      error,
    },
  };
}

const Position = ({ user, position, error }) => {
  if (error.isError) return <PageError error={error.error} />;

  const { user: authUser } = useAuth();
  const { coin, createdAt, updatedAt } = position;
  const isPositionOpen = createdAt === updatedAt;
  return (
    <div>
      <h2>{coin.toUpperCase()}</h2>
      <Chart
        startDate={createdAt}
        exitDate={isPositionOpen ? null : updatedAt}
        coin={coin}
        changeGranulation={true}
      />
      <PositionDetails {...position} owner={user} />
    </div>
  );
};

export default Position;
