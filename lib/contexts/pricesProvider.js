import { createContext, useContext, useEffect } from "react";
import useFetchData from "lib/hooks/useFetchData";
import getAllPrices from "lib/cryptoApi/getAllPrices";

const PricesContext = createContext(null);

export const usePricesState = () => useContext(PricesContext);

export const PricesStateProvider = ({ children }) => {
  const { execute, data, pending, error } = useFetchData(getAllPrices, true);

  useEffect(() => {
    const intervalID = setInterval(() => {
      execute();
    }, 10 * 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <PricesContext.Provider value={{ data, pending, error }}>
      {children}
    </PricesContext.Provider>
  );
};
