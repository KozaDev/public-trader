import { createContext, useContext, useState } from "react";
import useScrollBlock from "lib/hooks/useScrollBlock";

const NavContext = createContext(null);

export const useNavState = () => useContext(NavContext);

export const NavStateProvider = ({ children }) => {
  const [expanded, toggle] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  if (expanded) blockScroll();
  else allowScroll();

  return (
    <NavContext.Provider value={{ expanded, toggle }}>
      {children}
    </NavContext.Provider>
  );
};
