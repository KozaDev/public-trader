import { useCallback, useState } from "react";
import { StyledCard, StyledButton } from "styles/components";
import Modal from "../../templates/Modal/Modal";
import styled from "styled-components";
import Moment from "react-moment";
import { usePricesState } from "lib/contexts/pricesProvider";
import Chart from "../Chart";
import useFetchData from "lib/hooks/useFetchData";
import { useAuth } from "lib/contexts/authContext";
import PageError from "../../templates/PageError/PageError";
import axios from "axios";

const StyledPosition = styled(StyledCard)`
  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .green {
    color: ${({ theme }) => theme.colors.success};
  }

  .flex-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
`;

const Position = ({ details }) => {
  const {
    positionId,
    walletId,
    coin,
    createdAt,
    updatedAt,
    priceOnEntry,
    priceOnExit,
    description,
    amountOfCoin,
  } = details;
  const { data, error } = usePricesState();
  const { user } = useAuth();
  const [isModalActive, toggleModal] = useState(false);

  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  const isPositionOpen = updatedAt === createdAt;

  const displayReturn = useCallback(() => {
    if (error.isError) return "?";
    if (!data) return "...";

    const ultimatePrice = isPositionOpen ? data[coin] : priceOnExit;

    const currentReturn = ((ultimatePrice / priceOnEntry) * 100 - 100).toFixed(
      1
    );

    if (currentReturn < 0) return <span className="red">{currentReturn}%</span>;
    return <span className="green">{currentReturn}%</span>;
  });

  const {
    data: response,
    execute,
    error: closePositionError,
    pending,
  } = useFetchData(null, false);

  const closePosition = () => {
    execute(() =>
      axios({
        method: "put",
        url: `http://localhost:3000/api/sell-currency`,
        data: {
          positionId,
          walletId,
          priceOnEntry,
          priceOnExit: data[coin],
          coin,
          amountOfCoin,
        },
      })
    );
  };

  return (
    <StyledPosition>
      <div className="flex-wrapper">
        <h3>
          {coin.toUpperCase()} - USD <span>{displayReturn()}</span>
        </h3>
        <h3>
          <Moment date={createdAt} format="YYYY-MM-DD" /> -{" "}
          {isPositionOpen ? (
            "now"
          ) : (
            <Moment date={updatedAt} format="YYYY-MM-DD" />
          )}
        </h3>
      </div>

      <StyledButton onClick={openModal}>See more</StyledButton>

      {isModalActive && (
        <Modal>
          <Chart
            startDate={createdAt}
            exitDate={isPositionOpen ? null : updatedAt}
            coin={coin}
            changeGranulation={true}
          />

          <h3>{description}</h3>
          <h5>
            entry date: <Moment date={createdAt} format="YYYY-MM-DD hh:mm:ss" />
          </h5>
          {isPositionOpen ? (
            <h5>Position open</h5>
          ) : (
            <h5>
              exit date:{" "}
              <Moment date={updatedAt} format="YYYY-MM-DD hh:mm:ss" />
            </h5>
          )}
          <h5>
            coin: {coin} {displayReturn()}
          </h5>
          <h5>amount: {amountOfCoin}</h5>
          <h5>price on entry: {priceOnEntry}</h5>
          {isPositionOpen ? null : <h5>price on exit: {priceOnExit}</h5>}
          <h5>Invested money: {priceOnEntry * amountOfCoin}</h5>
          {isPositionOpen ? null : (
            <h5>Return: {priceOnExit * amountOfCoin}</h5>
          )}

          {data && isPositionOpen && user ? (
            <h4 onClick={closePosition}>close position</h4>
          ) : null}
          <h4 onClick={closeModal}>close modal</h4>
          {pending && <>{"..."}</>}
          {closePositionError.isError && (
            <PageError error={closePositionError.error} />
          )}
        </Modal>
      )}
    </StyledPosition>
  );
};

export default Position;
