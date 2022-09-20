import axios from "axios";
import { decimalPlaces } from "lib/consts/consts";
import {
  getJWTFromServerCookie,
  getIdFromServerCookie,
} from "lib/cookies/cookies";
import { updateAssets } from "lib/utils/utils";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { positionId, walletId, priceOnExit, coin, amountOfCoin } =
        req.body;
      const authorization = getJWTFromServerCookie(req);
      const userId = getIdFromServerCookie(req);

      if (!authorization || !userId)
        res.status(401).send({ message: "User unauthorized" });

      const positionRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions/${positionId}`
      );
      const {
        data: {
          data: {
            attributes: { createdAt, updatedAt },
          },
        },
      } = positionRes;

      const isPositionOpen = createdAt === updatedAt;

      if (!isPositionOpen)
        return res
          .status(403)
          .send({ message: "Can not update this position" });

      const walletRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets/${walletId}`
      );

      const wallet = walletRes.data.data.attributes;
      const dollarsToAdd = (amountOfCoin * priceOnExit).toFixed(
        decimalPlaces["usd"]
      );
      const updatedAssets = updateAssets(
        wallet.assets,
        coin,
        "usd",
        amountOfCoin,
        dollarsToAdd
      );

      const updatePositionRes = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions/${positionId}`,
        headers: {
          Authorization: `bearer ${authorization}`,
        },
        data: {
          data: {
            user: userId,
            priceOnExit,
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
        coin,
        differenceInDollars: dollarsToAdd,
        differnceInCoin: -amountOfCoin,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
}
