import { walletSchema } from "lib/consts";
import { useState } from "react";
import { pastDates } from "lib/consts";
import Chart from "components/Chart/Chart";
import Purchase from "components/Purchase";

export default function Markets() {
  const [market, setMarket] = useState("btc");
  const [chartStart, setStart] = useState({
    date: pastDates[2].date,
    name: pastDates[2].name,
  });

  return (
    <>
      {walletSchema.reduce((acc, item) => {
        if (item.key === "usd") return acc;
        return [
          ...acc,
          <button
            disabled={item.key === market}
            onClick={() => setMarket(item.key)}
          >
            {item.currency.toUpperCase()}
          </button>,
        ];
      }, [])}

      {pastDates.map(({ date, name }) => (
        <button
          key={date}
          disabled={chartStart.date === date}
          onClick={() => setStart({ date, name })}
        >
          {name}
        </button>
      ))}

      <Chart
        params={{ startDate: chartStart.date, coin: market }}
        changeGranulation={true}
      />

      {/* <Purchase coin={market} /> */}
    </>
  );
}
