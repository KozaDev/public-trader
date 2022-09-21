import { decimalPlaces, time } from "../consts/consts";
import moment from "moment";

export function getBestInterval(startDate, endDate, maxSizeOfReturnedArray) {
  const intervals = [
    { string: "5m", miliseconds: time["5m"] },
    { string: "15m", miliseconds: time["15m"] },
    { string: "30m", miliseconds: time["30m"] },
    { string: "1h", miliseconds: time["1h"] },
    { string: "1d", miliseconds: time["1d"] },
    { string: "1w", miliseconds: time["1w"] },
  ];

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const bestInterval = (end - start) / maxSizeOfReturnedArray;

  const result = intervals.reduceRight(
    (acc, interval) => {
      if (bestInterval < interval.miliseconds) return interval;
      return acc;
    },
    { string: "1w", miliseconds: time["1w"] }
  );

  return result.string;
}

export const isTooEarly = (start, end, period) => {
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();
  const minutesAgo = new Date().getTime() - period;
  if (startTimestamp - minutesAgo > 0 || endTimestamp - minutesAgo > 0) {
    return true;
  }
  return false;
};

export const getDaysFromISODate = (date) => {
  return date.slice(0, 10);
};

export const getMinutesFromISODate = (date) => {
  if (date.slice(11, 12) === "0") return date.slice(12, 16);
  return date.slice(11, 16);
};

export const getTimestamp = (date) => new Date(date).getTime();

export const getAproximatedPeriod = (start, end) => {
  const startInTimeStamp = getTimestamp(start);
  const endInTimeStamp = getTimestamp(end);
  const exactPeriod = endInTimeStamp - startInTimeStamp;

  const myTiem = { ...time };
  delete myTiem["5m"];
  delete myTiem["15m"];

  const likeArrayTimeObject = Object.entries(myTiem);

  const aproximatedPeriod = likeArrayTimeObject.reduce(
    (acc, item) => {
      const difference = Math.abs(item[1] - exactPeriod);
      if (exactPeriod > myTiem["1d"] && acc.time[0] === "1d")
        return { difference, time: ["1w", time["1w"]] };
      if (acc.difference > difference) return { difference, time: item };
      return acc;
    },
    { difference: myTiem["3y"], time: ["3y", myTiem["3y"]] }
  );
  return aproximatedPeriod.time[0];
};

export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const isNumberInputValid = (input, decimalPlace) => {
  const inputAsArray = input.toString().split("");
  const lastElementOfInput = inputAsArray[inputAsArray.length - 1];

  if (lastElementOfInput === undefined) return true;

  if (Number.isNaN(Number(lastElementOfInput))) return false;
  if (Number(input) < 0) return false;

  const dotIndex = inputAsArray.findIndex((item) => item === ".");
  if (dotIndex === -1) return true;

  const decimalPartAsArray = inputAsArray.slice(dotIndex + 1);

  if (decimalPartAsArray.length > decimalPlace) return false;
  return true;
};

export const updateAssets = (
  assets,
  removedAsset,
  addedAsset,
  amountOfRemoved,
  amountOfAdded
) => {
  return assets.map((item) => {
    if (item.key === removedAsset)
      return {
        ...item,
        amount: (Number(item.amount) - Number(amountOfRemoved)).toFixed(
          decimalPlaces[item.key]
        ),
      };
    if (item.key === addedAsset)
      return {
        ...item,
        amount: (Number(item.amount) + Number(amountOfAdded)).toFixed(
          decimalPlaces[item.key]
        ),
      };

    return item;
  });
};

export const allAssetsToDollars = (assets, pricesObject) => {
  return assets
    .reduce((acc, item) => pricesObject[item.key] * item.amount + acc, 0)
    .toFixed(2);
};

export const prepareTemplate = (strings, ...keys) => {
  return (dataObject) => {
    return strings.reduce((acc, string, index) => {
      if (index === strings.length - 1) return acc + string;
      return acc + string + dataObject[keys[index]];
    }, "");
  };
};

export const getDateFormatForRange = (start, end, aproximatedPeriod) => {
  const isPeriodDayOrLess =
    aproximatedPeriod === "1h" || aproximatedPeriod === "1d";
  const isPeriodOneWeek = aproximatedPeriod === "1w";
  const oneDay = time["1d"];
  const oneDayAgo = new Date().getTime() - oneDay * 3;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const exactPeriod = endTime - startTime;

  const isItMoreThanDayAgo = endTime - oneDayAgo < 0;

  if (isPeriodOneWeek && exactPeriod < 6.8 * oneDay) return "D/MM/YY hh:mmA";
  if (isItMoreThanDayAgo && isPeriodDayOrLess) return "D/MM/YY hh:mmA";
  if (isPeriodDayOrLess) return "hh:mm A";
  return "D MMM, YY";
};

export const getPriceNearestToDate = (prices, wantedDate) => {
  const nearestPriceObject = prices.reduce(
    (acc, item) => {
      const price = item[1];
      const date = new Date(item[0]).getTime();
      const currentDiff = Math.abs(date - wantedDate);
      if (currentDiff < acc.diff) return { price, diff: currentDiff };
      return acc;
    },
    { price: null, diff: time["3y"] }
  );
  return nearestPriceObject.price;
};

export const getIndexesNearestToDate = (prices, wantedDate) => {
  const nearestIndexObject = prices.reduce(
    (acc, item, index) => {
      const date = new Date(item[0]).getTime();
      const currentDiff = Math.abs(date - wantedDate);
      if (currentDiff < acc.diff) return { index, diff: currentDiff };
      return acc;
    },
    { index: null, diff: time["3y"] }
  );
  return nearestIndexObject.index;
};
