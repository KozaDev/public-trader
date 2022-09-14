import axios from "axios";
import { getBestInterval, isTooEarly } from "lib/utils/utils";
import { errorMessages } from "lib/consts/consts";

async function getPricesFromRangeOfDates(
  start,
  end,
  coin,
  maxSizeOfResponse = 2016 // acording to messari api
) {
  if (maxSizeOfResponse > 2016) throw new Error(errorMessages.noData);
  const response = await axios({
    method: "get",
    url: `https://data.messari.io/api/v1/markets/binance-${coin}-usdt/metrics/price/time-series?start=${start}&end=${end}&interval=${getBestInterval(
      start,
      end,
      maxSizeOfResponse
    )}&timestamp-format=rfc3339`,
  });

  const {
    data: {
      data: { values },
    },
  } = response;

  if (!values && isTooEarly(start, end, 1000 * 60 * 40))
    throw new Error(errorMessages.tooEearly);
  if (!values || values?.length < 2) throw new Error(errorMessages.noData);

  return values;
}

export default getPricesFromRangeOfDates;
