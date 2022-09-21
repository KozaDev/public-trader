import axios from "axios";
import UpdatedWallet from "components/molecules/UpdatedWallet/UpdatedWallet";
import PageError from "components/templates/PageError/PageError";
import { errorMessages } from "lib/consts/consts";
import { getIdFromServerCookie } from "lib/cookies/cookies";
import { assetsShape, transactionDetailsShape } from "lib/proptypes/proptypes";
import { errorFactory } from "lib/utils/errorHandlers";

export async function getServerSideProps({ req, query }) {
  const error = { isError: false, error: null };
  let walletAssets = null;
  let transactionDetails = null;

  try {
    const { details } = query;
    const userId = getIdFromServerCookie(req);

    if (!details || !userId)
      throw new Error({ message: errorMessages.notFound });

    transactionDetails = JSON.parse(atob(details));
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}?populate=wallet`
    );
    walletAssets = userRes.data.wallet.assets;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(new Error(errorMessages.notFound));
  }

  return {
    props: {
      walletAssets,
      transactionDetails,
      error,
    },
  };
}

const Success = ({ walletAssets, transactionDetails, error }) => {
  console.log(transactionDetails);
  if (error.isError) return <PageError error={error.error} />;
  return (
    <>
      <h2>Your wallet after transaction: </h2>
      <UpdatedWallet assets={walletAssets} update={transactionDetails} />
    </>
  );
};

Success.propTypes = {
  walletAssets: assetsShape,
  transactionDetails: transactionDetailsShape,
};

export default Success;
