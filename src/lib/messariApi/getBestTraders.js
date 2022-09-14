import axios from "axios";
import getAllPrices from "./getAllPrices";
import { allAssetsToDollars } from "lib/utils/utils";

async function getBestTraders(size) {
  const usersResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate=wallet`
  );

  if (usersResponse.data.length <= 0) return [];

  const pricesObject = await getAllPrices();

  const usersWithWallets = usersResponse.data.filter(({ wallet }) => wallet);

  const usersWithAssets = usersWithWallets.map(({ id, username, wallet }) => {
    const allAssetsInDollars = allAssetsToDollars(wallet.assets, pricesObject);

    return {
      id,
      username,
      allAssetsInDollars,
    };
  });

  const bestTraders = usersWithAssets
    .sort((a, b) => b.allAssetsInDollars - a.allAssetsInDollars)
    .slice(0, size);
  return bestTraders;
}

export default getBestTraders;
