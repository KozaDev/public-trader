import PropTypes from "prop-types";

export const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const nodeChild = PropTypes.node.isRequired;

export const errorShape = PropTypes.shape({
  message: PropTypes.string.isRequired,
  status: stringOrNumber,
  name: PropTypes.string,
  details: PropTypes.any,
});

export const assetsShape = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  })
);

export const walletShape = PropTypes.shape({
  createdAt: PropTypes.string,
  id: PropTypes.number.isRequired,
  publishedAt: PropTypes.string,
  updatedAt: PropTypes.string,
  assets: assetsShape.isRequired,
});

export const userShape = PropTypes.shape({
  blocked: PropTypes.bool,
  confirmed: PropTypes.bool,
  createdAt: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number.isRequired,
  provider: PropTypes.string,
  updatedAt: PropTypes.string,
  username: PropTypes.string,
  wallet: walletShape,
});

export const positionShape = PropTypes.shape({
  coin: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  description: PropTypes.string.isRequired,
  owner: userShape,
  priceOnEntry: PropTypes.number.isRequired,
  priceOnExit: PropTypes.number,
  updatedAt: PropTypes.string,
});

export const transactionDetailsShape = PropTypes.shape({
  coin: PropTypes.string,
  differenceInDollars: stringOrNumber,
  differnceInCoin: stringOrNumber,
});

export const cartFormDataShape = PropTypes.shape({
  walletId: PropTypes.number,
  coin: PropTypes.string,
  amountOfCoin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  priceOnEntry: PropTypes.number,
  description: PropTypes.string,
});

export const confirmLabelsProps = {
  amountOfCoin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  coinName: PropTypes.string.isRequired,
  coinPrice: PropTypes.number.isRequired,
};
