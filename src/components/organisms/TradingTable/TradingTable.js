import { walletSchema } from "lib/consts/consts";
import StyledTable, { StyledTradingTable } from "./StyledTable";
import Link from "next/link";
import ComponentError from "../ComponentError/ComponentError";
import Spinner from "components/templates/Spinner/Spinner";
import uuid from "react-uuid";
import Coin from "components/atoms/Coin/Coin";
import useFetchData from "lib/hooks/useFetchData";
import getAllPrices from "lib/messariApi/getAllPrices";
import getPricesFromPast from "lib/messariApi/getPricesFromPast";

const TradingTable = () => {
  const currency = walletSchema.reduce((acc, item) => {
    if (item.key === "usd") return acc;
    return [...acc, item.key];
  }, []);

  const periods = ["1h", "1d", "1w"];

  const {
    data: currentPricesData,
    error: currentPricesError,
    pending: currentPricesPending,
  } = useFetchData(getAllPrices, true);

  const {
    data: tradingTableData,
    error: tradingTableError,
    pending: tradingTablePending,
  } = useFetchData(getPricesFromPast.bind(null, periods, currency), true);

  if (tradingTableError.isError)
    return <ComponentError error={tradingTableError.error} />;
  if (currentPricesError.isError)
    return <ComponentError error={currentPricesError.error} />;

  if (tradingTablePending || currentPricesPending)
    return (
      <StyledTradingTable>
        <Spinner margin={"100px 0"} />{" "}
      </StyledTradingTable>
    );

  const displayChangeInPercent = (currentPrice, pastPrice) => {
    const change = ((currentPrice / pastPrice) * 100 - 100).toFixed(1);
    if (change > 0) return <span className="green">{change}%</span>;
    return <span className="red">{change}%</span>;
  };

  return (
    <StyledTradingTable>
      <StyledTable>
        <thead>
          <tr>
            {["#", "", "Price", ...periods].map((period) => (
              <th key={uuid()}>{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tradingTableData.map((item, index) => {
            const { coin, pricesFromPeriods } = item;
            return (
              <Link key={uuid()} href={`markets/${coin}`}>
                <tr>
                  <th>{index + 1}</th>
                  <th>
                    <Coin coin={coin} displayIcon displayPrefix />
                  </th>

                  <td className="price-in-usd">
                    <Coin
                      coin={"usd"}
                      amount={currentPricesData[coin].toFixed(2)}
                      displayUsdPrefix
                    />
                  </td>
                  {periods.map((period) => (
                    <td className="change-in-percents" key={uuid()}>
                      {displayChangeInPercent(
                        currentPricesData[coin],
                        pricesFromPeriods[period]
                      )}
                    </td>
                  ))}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTradingTable>
  );
};

export default TradingTable;
