import { errorMessages } from "lib/consts/consts";
import { errorFactory } from "lib/utils/errorHandlers";
import axios from "axios";
import PageError from "components/templates/PageError/PageError";
import Chart from "components/organisms/Chart";
import PositionDetails from "components/organisms/PositionDetails/PositionDetails";
import PositionClose from "components/molecules/PositionClose/PositionClose";
import { StyledCard } from "styles/components";
import { useAuth } from "lib/contexts/authContext";

export async function getServerSideProps({ params }) {
  const { user: id, positionId } = params;
  let user = null;
  let position = null;

  const error = { isError: false, error: null };

  try {
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}?populate=positions,wallet`
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

  const { coin, createdAt, updatedAt, amountOfCoin, id } = position;
  console.log(user);
  const {
    wallet: { id: walletId },
  } = user;

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
      <StyledCard>
        <PositionDetails {...position} owner={user} />
        {isPositionOpen && authUser?.id == user.id ? (
          <PositionClose
            coin={coin}
            amountOfCoin={amountOfCoin}
            positionId={id}
            walletId={walletId}
          />
        ) : null}
      </StyledCard>
    </div>
  );
};

export default Position;
