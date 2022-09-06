import Positions from "components/organisms/Positions/Positions";
import axios from "axios";
import Wallet from "components/molecules/Wallet/Wallet";
import useSWR from "swr";
import { useState } from "react";
import { errorFactory } from "lib/utils/errorHandlers";
import PageError from "components/templates/PageError/PageError";
import { walletSchema } from "lib/consts/consts";
import PageNav from "components/molecules/PageNav/PageNav";

export async function getServerSideProps({ params }) {
  const { user: id } = params;
  let user = null;
  let positions = null;

  const error = { isError: false, error: null };

  try {
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}?populate=wallet`
    );

    user = userResponse.data;

    if (!userResponse.data) throw new Error("User not found");

    if (!user.wallet) {
      const walletResponse = await axios({
        method: "post",
        url: "http://localhost:1337/api/wallets",
        headers: {
          Authorization: `bearer ${process.env.API_TOKEN}`,
        },
        data: {
          data: {
            user: id,
            assets: walletSchema,
          },
        },
      });
      user.wallet = walletResponse.data.data.attributes;
    }

    const positionsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?sort=createdAt:desc&filters[user][id][$eq]=${id}&pagination[page]=1&pagination[pageSize]=5`
    );

    positions = positionsResponse.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(error);
  }
  console.log(error);
  return {
    props: {
      user,
      positions,
      error,
    },
  };
}

const User = ({ user, positions, error }) => {
  if (error.isError) return <PageError error={error.error} />;

  const { username, wallet, id } = user;
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?sort=createdAt:desc&filters[user][id][$eq]=${id}&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,
    { fallbackData: positions }
  );

  const usersInfo = (
    <>
      <h1>{username}</h1>
      <Wallet assets={wallet.assets} />
    </>
  );

  if (swrError)
    return (
      <>
        <div>{usersInfo}</div>
        <PageError error={errorFactory(swrError)} />
      </>
    );

  return (
    <>
      <div>{usersInfo}</div>
      <Positions positions={data} walletId={wallet.id} />
      <PageNav
        currentPage={pageIndex}
        goToNext={setPageIndex.bind(null, (state) => state + 1)}
        goToPrevious={setPageIndex.bind(null, (state) => state - 1)}
        allPages={data.meta.pagination.pageCount}
      />
    </>
  );
};

export default User;
