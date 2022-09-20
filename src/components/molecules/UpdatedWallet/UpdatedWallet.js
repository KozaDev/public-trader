import { decimalPlaces } from "lib/consts/consts";
import DisplayCurrency from "components/atoms/DisplayCurrency/DisplayCurrency";
import StyledWallet from "../Wallet/StyledWallet";
import WalletValue from "components/atoms/WalletValue/WalletValue";

const UpdatedWallet = ({ assets, update }) => {
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
          <span className={`label ${isDiffPositive ? "green" : "red"}`}>
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

  return (
    <StyledWallet>
      <ul>
        {assetsAfterUpdate.length > 0 ? (
          <>
            <WalletValue assets={assets} title={"Wallet value"} />
            {assetsAfterUpdate}
          </>
        ) : (
          <li>
            <h3>This user dosen't have any assets in wallet</h3>
          </li>
        )}
      </ul>
    </StyledWallet>
  );
};

export default UpdatedWallet;
