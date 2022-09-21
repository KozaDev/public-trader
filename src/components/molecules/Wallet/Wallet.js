import StyledWallet from "./StyledWallet";
import { decimalPlaces } from "lib/consts/consts";
import DisplayCurrency from "components/atoms/DisplayCurrency/DisplayCurrency";
import WalletValue from "components/atoms/WalletValue/WalletValue";
import { assetsShape } from "lib/proptypes/proptypes";

const Wallet = ({ assets }) => {
  const currentAssets = assets.reduce((acc, item) => {
    if (item.amount > 0) {
      const amount = Number(item.amount).toFixed(decimalPlaces[item.key]);
      const currencyName = item.currency;
      acc.push(
        <li key={currencyName}>
          <DisplayCurrency amount={amount} coin={item.key} displayPrefix />
        </li>
      );
    }
    return acc;
  }, []);

  return (
    <StyledWallet>
      <WalletValue assets={assets} title={"Wallet value"} />
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

Wallet.propTypes = {
  assets: assetsShape.isRequired,
};

export default Wallet;
