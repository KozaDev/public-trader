import { useNavState } from "lib/contexts/navContext";
import StyledBurger from "./StyledBurger";

const Burger = () => {
  const { expanded, toggle } = useNavState();
  return (
    <>
      <StyledBurger
        expanded={expanded}
        onClick={() => toggle((state) => !state)}
      >
        <div />
        <div />
        <div />
      </StyledBurger>
    </>
  );
};

export default Burger;
