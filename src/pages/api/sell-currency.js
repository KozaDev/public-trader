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

      console.log("positionId:", positionId);
      console.log("walletId: ", walletId);
      console.log("priceOnExit: ", priceOnExit);
      console.log("coin: ", coin);
      console.log("amountOfCoin: ", amountOfCoin);
      const authorization = getJWTFromServerCookie(req);
      const userId = getIdFromServerCookie(req);

      console.log("authorization: ", authorization);
      console.log("userId: ", userId);
      if (!authorization)
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
      console.log("isPositionOpen: ", isPositionOpen);
      if (!isPositionOpen)
        return res
          .status(403)
          .send({ message: "Can not update this position" });

      const walletRes = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/wallets/${walletId}`
      );

      const wallet = walletRes.data.data.attributes;
      console.log("wallet: ", wallet);
      const dollarsToAdd = (amountOfCoin * priceOnExit).toFixed(
        decimalPlaces["usd"]
      );
      console.log("salesDollars: ", dollarsToAdd);
      const updatedAssets = updateAssets(
        wallet.assets,
        coin,
        "usd",
        amountOfCoin,
        dollarsToAdd
      );
      console.log("walletAfterupdate:", updatedAssets);

      const updatePositionRes = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/entry-positions/${positionId}`,
        headers: {
          Authorization: `bearer ${authorization}`,
        },
        data: {
          data: {
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
        assets: updatedAssets,
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
