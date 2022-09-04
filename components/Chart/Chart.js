import { useEffect, useState } from "react";
import useWindowSize from "lib/hooks/useWindowSize";
import useFetchData from "lib/hooks/useFetchData";
import PageError from "components/Errors/PageError";
import getPricesFromRangeOfDates from "lib/cryptoApi/getPricesFromRangeOfDates";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const LineChart = dynamic(() => import("./LineChart"), {
  suspense: true,
});

const Chart = ({ params, changeGranulation }) => {
  const { startDate, exitDate, coin } = params;
  const { width } = useWindowSize();

  const [dataGranulation, setGranulation] = useState(300);

  const { data, error, pending, execute } = useFetchData(
    getPricesFromRangeOfDates.bind(
      null,
      startDate,
      exitDate ? exitDate : new Date().toISOString(),
      coin,
      dataGranulation
    ),
    true,
    true
  );

  useEffect(() => {
    execute(
      getPricesFromRangeOfDates.bind(
        null,
        startDate,
        exitDate ? exitDate : new Date().toISOString(),
        coin,
        dataGranulation
      )
    );
  }, [startDate, exitDate, coin, dataGranulation]);

  const displayChart = () => {
    if (error.isError) return <PageError error={error.error} />;
    if (!data) return "...loading";
    return (
      <>
        <Suspense fallback={`Loading...`}>
          <LineChart data={data} width={width} />
        </Suspense>
        {changeGranulation && (
          <>
            <h5>Set data granulation</h5>
            {isChartUpdating()}
            <button
              disabled={dataGranulation === 2016}
              onClick={() => setGranulation(2016)}
            >
              More details
            </button>
            <button
              disabled={dataGranulation === 300}
              onClick={() => setGranulation(300)}
            >
              Normal
            </button>
            <button
              disabled={dataGranulation === 120}
              onClick={() => setGranulation(120)}
            >
              Less details
            </button>
          </>
        )}
      </>
    );
  };

  const isChartUpdating = () => <>{pending ? <>{"...loading"}</> : null}</>;

  return (
    <>
      {isChartUpdating()}
      {displayChart()}
    </>
  );
};

export default Chart;
