import axios from "axios";
import { getJWTFromServerCookie } from "lib/cookies/cookies";
import { updateAssets } from "lib/utils/utils";
//import { getCurrentPrice } from "../../lib/cryptoApiRequests";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        userId,
        walletId,
        description,
        coin,
        amountOfCoin,
        priceOnEntry,
      } = req.body;
      const authorization = getJWTFromServerCookie(req);

      if (!authorization)
        res.status(401).send({ message: "User unauthorized" });

      if (amountOfCoin <= 0)
        res.status(403).send({
          message:
            "You have to choose amount of coin or increase amount of coin",
        });

      // const currentPrice = await getCurrentPrice(coin);
      // const isPriceFromUserAccurate =
      //   currentPrice.price * 1.05 > priceOnEntry &&
      //   currentPrice.price * 0.95 < priceOnEntry;

      const isPriceFromUserAccurate = true;

      if (!isPriceFromUserAccurate)
        return res
          .status(403)
          .send({ message: "The price we got from you is wrong" });

      const walletRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets/${walletId}`
      );

      const wallet = walletRes.data.data.attributes;

      const requierdDollars = amountOfCoin * priceOnEntry;

      const dollarsInWallet = wallet.assets.find(
        (item) => item.key === "usd"
      ).amount;

      if (dollarsInWallet < requierdDollars)
        return res.status(403).send({ message: "You don't have enough money" });

      const updatedAssets = updateAssets(
        wallet.assets,
        "usd",
        coin,
        requierdDollars,
        amountOfCoin
      );

      const createPositionRes = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions`,
        headers: {
          Authorization: `bearer ${authorization}`,
        },
        data: {
          data: {
            user: userId,
            description,
            coin,
            amountOfCoin,
            priceOnEntry,
          },
        },
      });

      const updateWalletRes = await axios({
        method: "put",
        url: `http://localhost:1337/api/wallets/${walletId}`,
        headers: {
          Authorization: `bearer ${process.env.API_TOKEN}`,
        },
        data: {
          data: {
            user: userId,
            assets: updatedAssets,
          },
        },
      });

      return res.status(201).send({
        assets: updatedAssets,
        coin,
        differenceInDollars: -requierdDollars,
        differnceInCoin: amountOfCoin,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
}
