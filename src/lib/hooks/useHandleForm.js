import { useState } from "react";
import { errorFactory } from "lib/utils/errorHandlers";

const useHandleForm = (asyncFunction, onSuccess) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState({ isError: false, error: {} });

  const catchErrors = (e) => {
    setError({ isError: true, error: errorFactory(e) });
  };

  const unsetErrors = (fieldName) => {
    if (!fieldName || !error.isError) {
      setError({ isError: false, error: {} });
      return;
    }

    if (error.error?.details?.errors) {
      setError((state) => {
        const newErrors = state.error.details.errors.filter((item) => {
          if (item?.path?.[0]) return fieldName !== item.path[0];
        });

        if (newErrors.length > 0) {
          return {
            isError: true,
            error: {
              ...state.error,
              details: { ...state.details, errors: newErrors },
            },
          };
        }
        return { isError: false, error: {} };
      });
    }
  };

  const execute = () => {
    setPending(true);
    unsetErrors();
    return asyncFunction()
      .then((response) => {
        onSuccess(response);
        setPending(false);
      })
      .catch((e) => {
        catchErrors(e);
        setPending(false);
      });
  };

  return { execute, pending, error, unsetErrors };
};

export default useHandleForm;
