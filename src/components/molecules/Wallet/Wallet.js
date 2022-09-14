import StyledWallet from "./StyledWallet";
import NumberFormat from "react-number-format";
import { decimalPlaces } from "lib/consts/consts";
import { allAssetsToDollars, capitalizeFirstLetter } from "lib/utils/utils";
import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "components/atoms/Dollar/Dollar";
import Coin from "components/atoms/Coin/Coin";

const Wallet = ({ assets, update }) => {
  const { data, error } = usePricesState();

  const displayNumber = (amount, currency) => {
    const isItDollar = currency === "usd";
    if (isItDollar) return <Dollar amount={amount} />;
    return <Coin amount={amount} coin={currency} />;
  };

  const displayWalletValue = () => {
    if (error.isError) return "?";
    if (!data) return "...";
    const value = allAssetsToDollars(assets, data);
    return (
      <>
        <h2>All assets: {displayNumber(value, "usd")}</h2>
      </>
    );
  };

  if (update) {
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
            {capitalizeFirstLetter(currencyName)}
            {" - "}
            {displayNumber(amountBeforeUpdate, item.key)}

            {"   "}
            <span className={`label ${isDiffPositive ? "green" : "red"}`}>
              {isDiffPositive && "+"}
              {displayNumber(difference, item.key)}
            </span>
          </li>
        );
      }

      if (!currencyToUpdate && item.amount > 0) {
        acc.push(
          <li key={currencyName}>
            {capitalizeFirstLetter(currencyName)}
            {" - "}
            {displayNumber(item.amount, item.key)}
          </li>
        );
      }

      return acc;
    }, []);

    return (
      <StyledWallet>
        <ul>
          {assetsAfterUpdate.length > 0 ? (
            assetsAfterUpdate
          ) : (
            <li>
              <h3>This user dosen't have any assets in wallet</h3>
            </li>
          )}
        </ul>
      </StyledWallet>
    );
  }

  const currentAssets = assets.reduce((acc, item) => {
    if (item.amount > 0) {
      const amount = Number(item.amount).toFixed(decimalPlaces[item.key]);
      const currencyName = item.currency;
      acc.push(
        <li key={currencyName}>
          {capitalizeFirstLetter(currencyName)}
          {" - "}
          {displayNumber(amount, item.key)}
        </li>
      );
    }
    return acc;
  }, []);

  return (
    <StyledWallet>
      {displayWalletValue()}
      <ul>
        {currentAssets.length > 0 ? (
          currentAssets
        ) : (
          <li>
            <h3>This user dosen't have any assets in wallet</h3>
          </li>
        )}
      </ul>
    </StyledWallet>
  );
};

export default Wallet;
