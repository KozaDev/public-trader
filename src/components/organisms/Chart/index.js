import { useEffect, useState } from "react";
import useWindowSize from "lib/hooks/useWindowSize";
import useFetchData from "lib/hooks/useFetchData";
import PageError from "components/templates/PageError/PageError";
import getPricesFromRangeOfDates from "lib/messariApi/getPricesFromRangeOfDates";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Select from "components/molecules/Select/Select";
import StyledChart from "./StyledChart";

const LineChart = dynamic(() => import("./LineChart"), {
  suspense: true,
});

const granulation = [
  { title: "More detailes", value: 2016 },
  { title: "Normal", value: 300 },
  { title: "Less detailes", value: 120 },
];

const defaultGranulation = 300;

const Chart = ({ startDate, exitDate, coin, changeGranulation }) => {
  const { width } = useWindowSize();

  const [dataGranulation, setGranulation] = useState(defaultGranulation);

  const { data, error, pending, execute } = useFetchData(
    getPricesFromRangeOfDates.bind(
      null,
      startDate,
      exitDate ? exitDate : new Date().toISOString(),
      coin,
      dataGranulation
    ),
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

  const granulationOptions = granulation.map(({ title, value }) => ({
    title,
    value,
    attributes: { selected: value === dataGranulation },
  }));

  const handleGranulationChange = ({ target: { value } }) => {
    setGranulation(value);
  };

  if (error.isError) return <PageError error={error.error} />;
  if (pending) return "Loading...";

  return (
    <StyledChart>
      <Suspense fallback={`Loading...`}>
        <LineChart data={data} width={width} />
      </Suspense>
      {changeGranulation && (
        <div className="drop-down">
          <h5>{"Change data granulation"}</h5>
          <Select
            options={granulationOptions}
            handleChange={handleGranulationChange}
          />
        </div>
      )}
    </StyledChart>
  );
};

export default Chart;