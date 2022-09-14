import axios from "axios";
import Wallet from "components/molecules/Wallet/Wallet";
import useSWR from "swr";
import { useState } from "react";
import { errorFactory } from "lib/utils/errorHandlers";
import PageError from "components/templates/PageError/PageError";
import { errorMessages, walletSchema } from "lib/consts/consts";
import PageNav from "components/molecules/PageNav/PageNav";
import List from "components/organisms/List/List";
import PositionLabel from "components/molecules/PositionLabel/PositionLabel";
import { prepareTemplate } from "lib/utils/utils";

const sort = (order) => `sort=createdAt:${order}`;
const filterById = (id) => `filters[user][id][$eq]=${id}`;
const paginate = (pageIndex) =>
  `pagination[page]=${pageIndex}&pagination[pageSize]=5`;

export async function getServerSideProps({ params }) {
  const { user: id } = params;
  let user = null;
  let positions = null;

  const error = { isError: false, error: null };

  try {
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}?populate=wallet`
    );

    if (!userResponse.data) throw new Error(errorMessages.notFound);

    user = userResponse.data;

    if (!user.wallet) {
      const createWalletResponse = await axios({
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
      user.wallet = createWalletResponse.data.data.attributes;
    }

    const positionsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?${sort(
        "desc"
      )}&${filterById(id)}&${paginate(1)}`
    );
    positions = positionsResponse.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(e);
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
  if (error.isError) return <PageError error={error.error} />;
  const { username, wallet, id } = user;
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?${sort(
      "desc"
    )}&${filterById(id)}&${paginate(pageIndex)}`,
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
      <List
        Component={PositionLabel}
        data={data.data}
        params={{ userId: id }}
        listTitle={"Users positions"}
        emptyInfo={"This user dosen't have any positions"}
        linkEachTo={prepareTemplate`/users/${"userId"}/position/${"id"}`}
      />
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
