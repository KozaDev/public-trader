import { errorMessages, time, walletSchema } from "lib/consts/consts";
import {
  getIndexesNearestToDate,
  getPriceNearestToDate,
} from "lib/utils/utils";
import getPricesFromRangeOfDates from "./getPricesFromRangeOfDates";

async function getPricesFromPast(periods, currency) {
  currency.forEach((item) => {
    if (!walletSchema.some(({ key }) => item === key && item !== "usd"))
      throw new Error(
        `Currency array contains wrong currency. Check available currency in wallet schema. Remember that 'usd' is not allowed`
      );
  });

  periods.forEach((item) => {
    if (!time[item] || item === "5m" || item === "15m")
      throw new Error(
        "Wrong period, choose from time object in consts. Periods shorter than '1h' are not allowed"
      );
  });

  const periodsInTimestamp = periods.map((item) => time[item]);

  const longestPeriod = Math.max(...periodsInTimestamp);
  const longestPeriodAgo = new Date().getTime() - longestPeriod;

  const nowDate = new Date().toISOString();
  const endDate = new Date(longestPeriodAgo).toISOString();
  let responses = [];

  try {
    responses = await Promise.all(
      currency.map((item) => getPricesFromRangeOfDates(endDate, nowDate, item))
    );
  } catch (e) {
    throw new Error(errorMessages.externalAPIError);
  }

  const lengthsOfResponses = responses.map((res) => res.length);
  const longestRes = Math.max(...lengthsOfResponses);
  const shortestRes = Math.min(...lengthsOfResponses);
  const responsesLengthDifference = longestRes - shortestRes;
  const diffInPercents = (responsesLengthDifference / longestRes) * 100;
  const toleranceInPercents = 5;
  const relyOnTheSameIndexesForEachRes = diffInPercents < toleranceInPercents;

  if (relyOnTheSameIndexesForEachRes) {
    const indexesForPeriods = periods.reduce((acc, period) => {
      const periodAgoDate = new Date().getTime() - time[period];
      const indexOfDataFromPeriodAgo = getIndexesNearestToDate(
        responses[0],
        periodAgoDate
      );
      acc[period] = indexOfDataFromPeriodAgo;
      return acc;
    }, {});
    return responses.map((response, index) => ({
      pricesFromPeriods: periods.reduce((acc, period) => {
        const indexForPeriod = indexesForPeriods[period];
        acc[period] = response[indexForPeriod]
          ? response[indexForPeriod][1]
          : response[shortestRes - 1][1];
        return acc;
      }, {}),
      coin: currency[index],
    }));
  }

  return responses.map((response, index) => ({
    pricesFromPeriods: periods.reduce((acc, period) => {
      const periodAgoDate = new Date().getTime() - time[period];
      acc[period] = getPriceNearestToDate(response, periodAgoDate);
      return acc;
    }, {}),
    coin: currency[index],
  }));
}

export default getPricesFromPast;
