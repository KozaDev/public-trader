import { useState } from "react";
import { errorMessages, pastDates, walletSchema } from "lib/consts/consts";
import { capitalizeFirstLetter } from "lib/utils/utils";
import { getIdFromServerCookie } from "lib/cookies/cookies";
import Chart from "components/organisms/Chart";
import { errorFactory } from "lib/utils/errorHandlers";
import axios from "axios";
import Select from "components/molecules/Select/Select";
import MarketDetails from "components/organisms/MarketDetails/MarketDetails";
import PropTypes from "prop-types";
import { userShape, errorShape } from "lib/proptypes/proptypes";

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

export default function Market({ user, market }) {
  const weekAgo = pastDates[2].date;
  const weekAgoAsString = pastDates[2].name;

  const [chartStart, setStart] = useState({
    date: weekAgo,
    name: weekAgoAsString,
  });

  const coin = walletSchema.find(({ key }) => key === market);

  const dateOptions = pastDates.map(({ date, name }) => {
    return {
      value: date,
      title: name,
      attributes: { selected: name === chartStart.name },
    };
  });

  const handleSelectChange = (e) => {
    const newName = [...e.target.children].reduce((acc, item) => {
      if (item.value == e.target.value) return item.textContent;
      return acc;
    });

    setStart({ date: e.target.value, name: newName });
  };

  const header = <h1>{capitalizeFirstLetter(coin.currency)}</h1>;

  return (
    <>
      <>{header}</>

      <Select options={dateOptions} handleChange={handleSelectChange} />
      <Chart
        startDate={chartStart.date}
        coin={coin.key}
        changeGranulation={true}
      />
      <MarketDetails coin={coin} user={user} />
    </>
  );
}

Market.propTypes = {
  user: userShape,
  error: PropTypes.shape({
    isError: PropTypes.bool.isRequired,
    error: errorShape,
  }),
};
