import axios from "axios";

async function getCurrentPrice(coin) {
  const responseCurrentPrice = await axios.get(
    `https://data.messari.io/api/v1/assets/${coin}/metrics/market-data`
  );

  const {
    data: {
      data: { Asset, market_data },
    },
  } = responseCurrentPrice;
  return { key: Asset.symbol.toLowerCase(), price: market_data.price_usd };
}

export default getCurrentPrice;
