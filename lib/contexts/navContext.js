import { createContext, useContext, useState } from "react";

const NavContext = createContext(null);

export const useNavState = () => useContext(NavContext);

export const NavStateProvider = ({ children }) => {
  const [expanded, toggle] = useState(false);
  return (
    <NavContext.Provider value={{ expanded, toggle }}>
      {children}
    </NavContext.Provider>
  );
};
