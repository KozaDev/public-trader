import axios from "axios";
import { decimalPlaces, errorMessages } from "lib/consts/consts";
import {
  getIdFromServerCookie,
  getJWTFromServerCookie,
} from "lib/cookies/cookies";
import { updateAssets } from "lib/utils/utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { walletId, description, coin, amountOfCoin, priceOnEntry } =
        req.body;
      const authorization = getJWTFromServerCookie(req);
      const userId = getIdFromServerCookie(req);

      if (!authorization)
        return res
          .status(401)
          .send({ message: errorMessages.unauthorizedUser });

      if (description.trim().length < 30 || description.trim().length > 300)
        return res.status(400).send({
          message: errorMessages.wrongDescription,
        });

      const requierdDollars = amountOfCoin * priceOnEntry;

      if (
        amountOfCoin <= 0 ||
        requierdDollars.toFixed(decimalPlaces["usd"]) <= 0
      )
        return res.status(400).send({
          message: errorMessages.wrongAmountOfcoin,
        });

      // const currentPrice = await getCurrentPrice(coin);
      // const isPriceFromUserAccurate =
      //   currentPrice.price * 1.02 > priceOnEntry &&
      //   currentPrice.price * 0.98 < priceOnEntry;

      const isPriceFromUserAccurate = true;

      if (!isPriceFromUserAccurate)
        return res.status(400).send({ message: errorMessages.wrongCoinPrice });

      const walletRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets/${walletId}`
      );

      const wallet = walletRes.data.data.attributes;

      const dollarsInWallet = wallet.assets.find(
        (item) => item.key === "usd"
      ).amount;

      if (dollarsInWallet < requierdDollars)
        return res.status(403).send({ message: errorMessages.noMoney });

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
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets/${walletId}`,
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
        coin,
        differenceInDollars: -Number(requierdDollars).toFixed(
          decimalPlaces["usd"]
        ),
        differnceInCoin: Number(amountOfCoin).toFixed(decimalPlaces[coin]),
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: errorMessages.serverError });
    }
  }
}
