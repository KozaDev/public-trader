import getPricesFromPast from "lib/messariApi/getPricesFromPast";
import useFetchData from "./useFetchData";

const useTradingTableData = (periods, currency) => {
  const { data, error, pending } = useFetchData(
    getPricesFromPast.bind(null, periods, currency)
  );

  return {
    tradingTableData: data,
    tradingTableError: error,
    tradingTablePending: pending,
  };
};

export default useTradingTableData;
