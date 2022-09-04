import { errorFactory } from "lib/errorHandlers";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import PageError from "components/Errors/PageError";
import { StyledCard } from "styles/components";

export async function getServerSideProps() {
  let traders = [];
  const error = { isError: false, error: null };

  try {
    const tradersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?start=0&limit=10`
    );

    traders = tradersRes.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(error);
  }

  return {
    props: {
      traders,
      error,
    },
  };
}

const TradersList = ({ traders, error }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error: swrError } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?start=${
      pageIndex * 10
    }&limit=${pageIndex * 10 + 10}`,
    fetcher,
    { fallbackData: traders }
  );
  const displayTraders = () => {
    if (error.isError) return <PageError error={error.error} />;
    if (swrError) return <PageError error={errorFactory(swrError)} />;
    return (
      <>
        {data.length > 0 ? (
          <>
            <Link href={"/users/top/10"}>See top 10 traders</Link>
            <div>
              {data.map(({ username, id }) => {
                return (
                  <Link key={id} href={`users/${id}`}>
                    <StyledCard>{username}</StyledCard>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <h2>Currently list of traders is empty</h2>
        )}
      </>
    );
  };
  return (
    <>
      <h1>Traders</h1>
      {displayTraders()}
      {/* <button onClick={setPageIndex((state) => state++)}>Next page</button> */}
    </>
  );
};

export default TradersList;
