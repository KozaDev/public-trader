import { errorMessages } from "../consts/consts";

export const errorFactory = (error) => {
  console.error(error);
  if (error?.config?.url.includes(process.env.MESSARI_API)) {
    return {
      message: errorMessages.externalAPIError,
      status: error?.response?.status || null,
      name: null,
      details: null,
    };
  }

  if (error?.config?.url.includes(process.env.NEXT_PUBLIC_STRAPI_URL)) {
    return {
      message: errorMessages.serverError,
      status: error?.response?.status || null,
      name: null,
      details: null,
    };
  }

  if (error?.response?.data?.message) {
    return {
      message: error?.response?.data?.message,
      status: null,
      name: null,
      details: null,
    };
  }

  if (!error.response || !error?.response?.data?.error) {
    return {
      message: error.message || errorMessages.somethingWentWrong,
      status: null,
      name: null,
      details: null,
    };
  }
  // destructure data according to:
  // https://docs.strapi.io/developer-docs/latest/developer-resources/error-handling.html#receiving-errors

  const {
    error: { status, message, details, name },
  } = error.response.data;

  return {
    message,
    status,
    name,
    details: details == undefined ? null : details,
  };
};
