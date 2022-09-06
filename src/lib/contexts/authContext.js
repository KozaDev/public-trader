import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import {
  setUserInCookies,
  removeUserFromCookies,
  getUserFromCookies,
} from "../cookies/cookies";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserFromCookies();
    if (user) {
      setUser({ id: user.id, username: user.username });
    }
  }, []);

  const signin = ({ jwt, user: { id, username } }) => {
    setUser({ id, username });
    setUserInCookies({ jwt, id, username });
  };

  const signout = () => {
    setUser(null);
    removeUserFromCookies();
    Router.push("/");
  };

  return {
    user,
    signin,
    signout,
  };
}
