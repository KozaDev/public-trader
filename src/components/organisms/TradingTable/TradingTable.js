import Dollar from "components/atoms/Dollar/Dollar";
import { walletSchema } from "lib/consts/consts";
import { usePricesState } from "lib/contexts/pricesProvider";
import useTradingTableData from "lib/hooks/useTradingTableData";
import StyledTable from "./StyledTable";
import Link from "next/link";
import ComponentError from "../ComponentError/ComponentError";
import Spinner from "components/templates/Spinner/Spinner";
import uuid from "react-uuid";

const TradingTable = () => {
  const currency = walletSchema.reduce((acc, item) => {
    if (item.key === "usd") return acc;
    return [...acc, item.key];
  }, []);

  const periods = ["1h", "1d", "1w"];

  const { data: currentPricesData, error: currentPricesError } =
    usePricesState();

  const { tradingTableData, tradingTableError, tradingTablePending } =
    useTradingTableData(periods, currency);

  if (tradingTableError.isError)
    return <ComponentError error={tradingTableError.error} />;
  if (currentPricesError.isError)
    return <ComponentError error={currentPricesError.error} />;

  if (tradingTablePending || !currentPricesData)
    return (
      <StyledTable>
        <Spinner margin={"100px 0"} />
      </StyledTable>
    );

  const displayChangeInPercent = (currentPrice, pastPrice) => {
    const change = ((currentPrice / pastPrice) * 100 - 100).toFixed(1);
    if (change > 0) return <span className="green">{change}%</span>;
    return <span className="red">{change}%</span>;
  };
  return (
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
            <tr key={uuid()}>
              <th>{index + 1}</th>
              <th>
                <Link href={`markets/${coin}`}>{coin}</Link>
              </th>
              <td>
                <Dollar amount={currentPricesData[coin].toFixed(2)} />
              </td>
              {periods.map((period) => (
                <td key={uuid()}>
                  {displayChangeInPercent(
                    currentPricesData[coin],
                    pricesFromPeriods[period]
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default TradingTable;
