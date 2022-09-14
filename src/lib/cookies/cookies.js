import Cookies from "js-cookie";

export const setUserInCookies = ({ id, username, jwt }) => {
  Cookies.set("id", id);
  Cookies.set("username", username);
  Cookies.set("jwt", jwt);
};

export const removeUserFromCookies = () => {
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
};

export const getUserFromCookies = () => {
  const id = Cookies.get("id");
  const username = Cookies.get("username");
  const jwt = Cookies.get("jwt");

  if (id && username && jwt) {
    return {
      id,
      username,
      jwt,
    };
  }

  return null;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers?.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};

export const getJWTFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};
