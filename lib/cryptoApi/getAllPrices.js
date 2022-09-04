import getCurrentPrice from "./getCurrentPrice";
import { walletSchema } from "lib/consts";

async function getAllPrices() {
  const pricesResponse = await Promise.all(
    walletSchema.reduce((acc, item) => {
      if (item.key === "usd") {
        return acc;
      }
      return [getCurrentPrice(item.key), ...acc];
    }, [])
  );

  pricesResponse.push({ key: "usd", price: 1 });

  return pricesResponse.reduce((acc, item) => {
    acc[item.key] = item.price;
    return acc;
  }, {});
}

export default getAllPrices;
