import axios from "axios";
import Wallet from "components/molecules/Wallet/Wallet";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { errorFactory } from "lib/utils/errorHandlers";
import PageError from "components/templates/PageError/PageError";
import { errorMessages, walletSchema } from "lib/consts/consts";
import PageNav from "components/molecules/PageNav/PageNav";
import List from "components/organisms/List/List";
import PositionLabel from "components/molecules/PositionLabel/PositionLabel";
import PropTypes from "prop-types";
import { prepareTemplate } from "lib/utils/utils";
import { useRouter } from "next/router";
import { positionShape, userShape } from "lib/proptypes/proptypes";
import { useAuth } from "lib/contexts/authContext";

const sort = (order) => `sort=createdAt:${order}`;
const filterById = (id) => `filters[user][id][$eq]=${id}`;
const paginate = (pageIndex) =>
  `pagination[page]=${pageIndex}&pagination[pageSize]=5`;

export async function getServerSideProps({ params, query }) {
  const { user: id } = params;
  const { page: pageFromQuery } = query;
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
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets`,
        data: {
          data: {
            user: id,
            assets: walletSchema,
          },
        },
      });
      user.wallet = createWalletResponse.data.data.attributes;
    }

    const paginationPage = pageFromQuery || 1;

    if (Number.isNaN(Number(paginationPage)))
      throw new Error(errorMessages.notFound);

    const positionsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?${sort(
        "desc"
      )}&${filterById(id)}&${paginate(paginationPage)}`
    );

    const {
      data: {
        meta: {
          pagination: { pageCount },
        },
      },
    } = positionsResponse;

    if (Number(pageFromQuery) > pageCount || paginationPage < 1)
      throw new Error(errorMessages.notFound);

    positions = positionsResponse.data;
  } catch (e) {
    console.log(e);
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

const User = ({ user, positions }) => {
  const { username, wallet, id } = user;
  const { user: authenticatedUser } = useAuth();
  const router = useRouter();
  const pageFromRouter = router.query?.page || 1;
  const paginationData = positions.meta.pagination;
  const [pageIndex, setPageIndex] = useState(Number(pageFromRouter));

  useEffect(() => {
    setPageIndex(Number(pageFromRouter));
  }, [pageFromRouter]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions?${sort(
      "desc"
    )}&${filterById(id)}&${paginate(pageIndex)}`,
    fetcher,
    { fallbackData: positions }
  );

  const decreasePage = (diff) => {
    const prevPage = pageIndex - diff;
    if (prevPage < 1) return;
    router.push({ query: { user: user.id, page: prevPage } }, undefined, {
      shallow: true,
    });
  };

  const increasePage = (diff) => {
    const nextPage = pageIndex + diff;
    if (nextPage > paginationData.pageCount) return;
    router.push({ query: { user: user.id, page: nextPage } }, undefined, {
      shallow: true,
    });
  };

  const userDetails = (
    <>
      <h1>{username}</h1>
      <Wallet assets={wallet.assets} />
    </>
  );

  if (swrError)
    return (
      <>
        <div>{userDetails}</div>
        <PageError error={errorFactory(swrError)} />
      </>
    );

  return (
    <>
      <div>{userDetails}</div>
      <List
        Component={PositionLabel}
        data={data.data}
        params={{ userId: id }}
        listTitle={"User's positions"}
        emptyInfo={
          id == authenticatedUser?.id
            ? "You don't have any positions. Visit markets to buy your first currency"
            : "This user dosen't have any positions"
        }
        linkEachTo={prepareTemplate`/users/${"userId"}/position/${"id"}`}
      />
      {paginationData.pageCount > 1 && (
        <PageNav
          currentPage={pageIndex}
          goToNext={increasePage}
          goToPrevious={decreasePage}
          allPages={paginationData.pageCount}
          visibleRange={3}
        />
      )}
    </>
  );
};

User.propTypes = {
  user: userShape,
  positions: PropTypes.arrayOf(positionShape),
};
export default User;
