import { decimalPlaces } from "lib/consts/consts";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import Image from "next/image";
import StyledCoin from "./StyledCoin";

const Coin = ({
  amount,
  coin,
  displayPrefix,
  displayIcon,
  displayUsdPrefix,
}) => {
  const amoutWithRigthDecimalPlaces = Number(amount).toFixed(
    decimalPlaces[coin]
  );

  const noZeroAmount = amoutWithRigthDecimalPlaces * 1;
  return (
    <StyledCoin>
      {displayIcon && (
        <span className="icon">
          <Image
            src={`/icons/${coin}.png`}
            alt="Picture of the author"
            width={28}
            height={28}
          />
        </span>
      )}
      {amount && (
        <NumberFormat
          className="amount"
          value={noZeroAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={displayUsdPrefix ? "$" : null}
        />
      )}
      {displayPrefix && <span className="prefix">{coin}</span>}
    </StyledCoin>
  );
};

Coin.propTypes = {
  coin: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayPrefix: PropTypes.bool,
  displayIcon: PropTypes.bool,
};

export default Coin;
