import { decimalPlaces } from "lib/consts/consts";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import StyledCoin from "./StyledCoin";
import Icon from "../Icon/Icon";

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
          <Icon className="icon" iconName={coin} width={28} height={28} />
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
