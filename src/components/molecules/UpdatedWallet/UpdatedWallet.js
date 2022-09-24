import { decimalPlaces } from "lib/consts/consts";
import DisplayCurrency from "components/atoms/DisplayCurrency/DisplayCurrency";
import StyledWallet from "../Wallet/StyledWallet";
import WalletValue from "components/atoms/WalletValue/WalletValue";
import { assetsShape, transactionDetailsShape } from "lib/proptypes/proptypes";
import { useAuth } from "lib/contexts/authContext";
import Link from "next/link";

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
          <DisplayCurrency
            amount={amountBeforeUpdate}
            coin={item.key}
            displayPrefix
          />

          {"   "}
          <span className={isDiffPositive ? "label green" : "label red"}>
            {isDiffPositive ? "(+" : "("}
            <DisplayCurrency
              amount={difference}
              coin={item.key}
              displayPrefix
            />
            {")"}
          </span>
        </li>
      );
    }

    if (!currencyToUpdate && item.amount > 0) {
      acc.push(
        <li key={currencyName}>
          <DisplayCurrency amount={item.amount} coin={item.key} displayPrefix />
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
        {assetsAfterUpdate}
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
