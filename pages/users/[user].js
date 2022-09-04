import Positions from "components/Positions";
import axios from "axios";
import Wallet from "components/Wallet";
import useSWR from "swr";
import { useState } from "react";
import { errorFactory } from "lib/errorHandlers";
import PageError from "components/Errors/PageError";
import { walletSchema } from "lib/consts";

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

  return {
    props: {
      user,
      positions,
      error,
    },
  };
}

const User = ({ user, positions, error }) => {
  const { username, wallet, id } = user;
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?sort=createdAt:desc&filters[user][id][$eq]=${id}&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,
    { fallbackData: positions }
  );
  return (
    <>
      {error.isError ? (
        <PageError error={error.error} />
      ) : (
        <>
          <h1>{username}</h1>
          <Wallet assets={wallet.assets} />
          {swrError ? (
            <PageError error={errorFactory(swrError)} />
          ) : (
            <Positions positions={data} walletId={wallet.id} />
          )}
          <div>
            <button
              disabled={pageIndex === 1}
              onClick={() => setPageIndex((state) => state - 1)}
            >
              Previous
            </button>
            <button
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex((state) => state + 1)}
            >
              Next
            </button>
            <span>{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>
          </div>
        </>
      )}
    </>
  );
};

export default User;
