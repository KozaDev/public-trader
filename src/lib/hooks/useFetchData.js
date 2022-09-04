import { useState, useEffect, useCallback } from "react";
import { errorFactory } from "src/lib/errorHandlers";

const useFetchData = (asyncFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState({ isError: false, error: null });
  const [pending, setPending] = useState(immediate);

  let execute = useCallback(
    (newFunction) => {
      const request = newFunction ? newFunction : asyncFunction;

      setPending(true);
      return request()
        .then((data) => {
          setData(data);
          setError({ isError: false, error: null });
          setPending(false);
        })
        .catch((e) => {
          console.error(e);
          setError({ isError: true, error: errorFactory(e) });
          setPending(false);
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { execute, data, pending, error };
};

export default useFetchData;
