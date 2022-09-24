import { errorFactory } from "lib/utils/errorHandlers";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import PageError from "components/templates/PageError/PageError";
import List from "components/organisms/List/List";
import UsersLabel from "components/atoms/UsersLabel/UsersLabel";
import { prepareTemplate } from "lib/utils/utils";
import PropTypes from "prop-types";
import { errorShape, userShape } from "lib/proptypes/proptypes";

export async function getServerSideProps() {
  let traders = null;
  const error = { isError: false, error: null };

  try {
    const tradersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?start=0&limit=10`
    );

    traders = tradersRes.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(e);
  }

  return {
    props: {
      traders,
      error,
    },
  };
}

const TradersList = ({ traders }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?start=${
      pageIndex * 10
    }&limit=${pageIndex * 10 + 10}`,
    fetcher,
    { fallbackData: traders }
  );

  if (swrError) return <PageError error={errorFactory(swrError)} />;

  if (!data.length) return <h2>Currently list of traders is empty</h2>;

  return (
    <>
      <h1>Traders</h1>
      <Link href={"/users/top/10"}>See top 10 traders</Link>
      <List
        data={data}
        Component={UsersLabel}
        emptyInfo={"List of traders is empty"}
        linkEachTo={prepareTemplate`users/${"id"}`}
      />
    </>
  );
};

TradersList.propTypes = {
  traders: PropTypes.arrayOf(userShape),
};

export default TradersList;
