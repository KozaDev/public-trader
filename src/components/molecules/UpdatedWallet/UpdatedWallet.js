import { decimalPlaces } from "lib/consts/consts";
import StyledWallet from "../Wallet/StyledWallet";
import WalletValue from "components/atoms/WalletValue/WalletValue";
import { assetsShape, transactionDetailsShape } from "lib/proptypes/proptypes";
import { useAuth } from "lib/contexts/authContext";
import Link from "next/link";
import Coin from "components/atoms/Coin/Coin";

const UpdatedWallet = ({ assets, update }) => {
  const { user } = useAuth();
  const { coin, differnceInCoin, differenceInDollars } = update;

  const assetsAfterUpdate = assets.reduce((acc, item) => {
    const isItDollar = item.key === "usd";
    const currencyToUpdate = coin === item.key || isItDollar;
    const currencyName = item.currency;

    if (currencyToUpdate) {
      const difference = isItDollar
        ? Number(differenceInDollars).toFixed(decimalPlaces["usd"])
        : Number(differnceInCoin).toFixed(decimalPlaces[coin]);
      const isDiffPositive = difference > 0;
      const amountBeforeUpdate = Number(item.amount).toFixed(
        decimalPlaces[item.key]
      );

      acc.push(
        <li key={currencyName}>
          <Coin
            amount={amountBeforeUpdate}
            coin={item.key}
            displayPrefix
            displayIcon
          />

          {"   "}
          <span className={isDiffPositive ? "label green" : "label red"}>
            <span>
              {" "}
              {isDiffPositive ? "(+" : "("}
              <Coin amount={difference} coin={item.key} displayPrefix />
              {")"}
            </span>
          </span>
        </li>
      );
    }

    if (!currencyToUpdate && item.amount > 0) {
      acc.push(
        <li key={currencyName}>
          <Coin
            amount={item.amount}
            coin={item.key}
            displayPrefix
            displayIcon
          />
        </li>
      );
    }

    return acc;
  }, []);

  const linkToProfile = user?.id && (
    <h4>
      <Link href={`/users/${user?.id}`}>{"Go to profile"}</Link>
    </h4>
  );

  if (assetsAfterUpdate.length)
    return (
      <StyledWallet>
        <WalletValue assets={assets} title={"Wallet value"} />
        <ul>{assetsAfterUpdate}</ul>
        {linkToProfile}
      </StyledWallet>
    );

  return (
    <StyledWallet>
      <ul>
        <li>
          <h3>{"This user dosen't have any assets in wallet"}</h3>
        </li>
      </ul>
    </StyledWallet>
  );
};

UpdatedWallet.propTypes = {
  assets: assetsShape.isRequired,
  update: transactionDetailsShape.isRequired,
};

export default UpdatedWallet;
