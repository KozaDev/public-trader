import StyledWallet from "./StyledWallet";
import { decimalPlaces } from "lib/consts/consts";
import { allAssetsToDollars, capitalizeFirstLetter } from "lib/utils/utils";
import { usePricesState } from "lib/contexts/pricesProvider";
import Dollar from "components/atoms/Dollar/Dollar";
import Coin from "components/atoms/Coin/Coin";

const Wallet = ({ assets, update }) => {
  const { data, error } = usePricesState();

  const displayAsset = (amount, currency, displayPrefix) => {
    const isItDollar = currency === "usd";
    return (
      <>
        {isItDollar ? (
          <Dollar amount={amount} displayPrefix={!!displayPrefix} />
        ) : (
          <Coin
            amount={amount}
            coin={currency}
            displayPrefix={!!displayPrefix}
            layPrefix
          />
        )}
      </>
    );
  };

  const displayWalletValue = () => {
    if (error.isError) return "?";
    if (!data) return "...";
    const value = allAssetsToDollars(assets, data);
    return (
      <h2>
        Wallet value <Dollar amount={value} />
      </h2>
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
            {displayAsset(amountBeforeUpdate, item.key, true)}

            {"   "}
            <span className={`label ${isDiffPositive ? "green" : "red"}`}>
              {isDiffPositive ? "(+" : "("}
              {displayAsset(difference, item.key)}
              {")"}
            </span>
          </li>
        );
      }

      if (!currencyToUpdate && item.amount > 0) {
        acc.push(
          <li key={currencyName}>
            {displayAsset(item.amount, item.key, true)}
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
        <li key={currencyName}>{displayAsset(amount, item.key, true)}</li>
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
