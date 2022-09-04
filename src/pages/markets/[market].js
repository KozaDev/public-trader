import { useState } from "react";
import { errorMessages, pastDates, walletSchema } from "lib/consts";
import { capitalizeFirstLetter } from "lib/utils";
import { getIdFromServerCookie } from "lib/cookies";
import Chart from "components/molecules/Chart";
import Purchase from "components/organisms/Purchase/Purchase";
import PageError from "components/templates/PageError/PageError";
import { errorFactory } from "lib/errorHandlers";
import axios from "axios";

export async function getServerSideProps({ req, params: { market } }) {
  const error = { isError: false, error: null };
  let user = null;

  try {
    const isRouteCorrect = walletSchema.some((item) => {
      if (item.key === "usd") return false;
      return item.key === market;
    });

    if (!isRouteCorrect) throw new Error(errorMessages.notFound);

    const userId = getIdFromServerCookie(req);

    if (userId) {
      const userRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}/?populate=wallet`
      );
      user = userRes.data || null;
    }
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(e);
  }

  return {
    props: {
      user,
      market,
      error,
    },
  };
}

export default function Market({ user, market, error }) {
  const weekAgo = pastDates[2].date;
  const weekAgoAsString = pastDates[2].name;

  const [chartStart, setStart] = useState({
    date: weekAgo,
    name: weekAgoAsString,
  });

  const coin = walletSchema.find(({ key }) => key === market);
  const displayMarket = () => {
    if (error.isError) return <PageError error={error.error} />;
    return (
      <>
        <h1>{capitalizeFirstLetter(coin.currency)}</h1>
        {pastDates.map(({ date, name }) => (
          <button
            key={name}
            disabled={chartStart.date === date}
            onClick={() => setStart({ date, name })}
          >
            {name}
          </button>
        ))}

        <Chart
          startDate={chartStart.date}
          exitDate={null}
          coin={market}
          changeGranulation={true}
        />

        <Purchase coin={coin} user={user} />
      </>
    );
  };

  return <>{displayMarket()}</>;
}
