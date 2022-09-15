export const walletSchema = [
  { key: "usd", currency: "dollar", amount: 100000 },
  { key: "btc", currency: "bitcoin", amount: 0 },
  { key: "eth", currency: "etherum", amount: 0 },
  { key: "doge", currency: "dogecoin", amount: 0 },
  { key: "bnb", currency: "binance coin", amount: 0 },
  { key: "xrp", currency: "ripple", amount: 0 },
  { key: "ada", currency: "cardano", amount: 0 },
  { key: "sol", currency: "solana", amount: 0 },
  { key: "dot", currency: "polkadot", amount: 0 },
];

export const decimalPlaces = {
  usd: 2,
  btc: 8,
  eth: 18,
  doge: 8,
  bnb: 8,
  xrp: 6,
  ada: 6,
  sol: 9,
  dot: 10,
};

export const time = {
  "5m": 1000 * 60 * 5,
  "15m": 1000 * 60 * 15,
  "1h": 1000 * 60 * 60,
  "1d": 1000 * 60 * 60 * 24,
  "1w": 1000 * 60 * 60 * 24 * 7,
  "1m": 1000 * 60 * 60 * 24 * 31,
  "3m": 1000 * 60 * 60 * 24 * 31 * 3,
  "1y": 1000 * 60 * 60 * 24 * 365,
  "3y": 1000 * 60 * 60 * 24 * 365 * 3,
};

export const pastDates = [
  {
    date: new Date(new Date().getTime() - time["1h"]).toISOString(),
    name: "1h",
  },
  {
    date: new Date(new Date().getTime() - time["1d"]).toISOString(),
    name: "1d",
  },
  {
    date: new Date(new Date().getTime() - time["1w"]).toISOString(),
    name: "1w",
  },
  {
    date: new Date(new Date().getTime() - time["1m"]).toISOString(),
    name: "1m",
  },
  {
    date: new Date(new Date().getTime() - time["3m"]).toISOString(),
    name: "3m",
  },
  {
    date: new Date(new Date().getTime() - time["1y"]).toISOString(),
    name: "1y",
  },
  {
    date: new Date(new Date().getTime() - time["3y"]).toISOString(),
    name: "3y",
  },
];

export const emptyRegisterForm = {
  username: "",
  email: "",
  password: "",
};

export const emptyLoginForm = {
  identifier: "",
  password: "",
};

export const errorMessages = {
  tooEearly: "Too early to get data from API",
  noData: "No data",
  notFound: "Not found",
  noPrice: "Can not display current price",
  somethingWentWrong: "Something went wrong",
  externalAPIError: "Can not fetch data from external API",
  serverError: "Can not connect to server",
  noMoney: "You don't have enough money",
};
