import { walletSchema } from "lib/consts/consts";
import { usePricesState } from "lib/contexts/pricesProvider";
import useTradingTableData from "lib/hooks/useTradingTableData";
import StyledTable from "./StyledTable";
import Link from "next/link";
import ComponentError from "../ComponentError/ComponentError";
import Spinner from "components/templates/Spinner/Spinner";
import uuid from "react-uuid";
import Coin from "components/atoms/Coin/Coin";

const TradingTable = () => {
  const currency = walletSchema.reduce((acc, item) => {
    if (item.key === "usd") return acc;
    return [...acc, item.key];
  }, []);

  const periods = ["1h", "1d", "1w"];

  const displayChangeInPercent = (currentPrice, pastPrice) => {
    const change = ((currentPrice / pastPrice) * 100 - 100).toFixed(1);
    if (change > 0) return <span className="green">{change}%</span>;
    return <span className="red">{change}%</span>;
  };

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
            <Link href={`markets/${coin}`}>
              <tr key={uuid()}>
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
  );
};

export default TradingTable;
