import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "lib/contexts/authContext";
import styled from "styled-components";
import { useNavState } from "lib/contexts/navContext";

const StyledLinkList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  font-size: ${({ theme }) => theme.fontSize.xl};

  li {
    padding: 18px 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ expanded }) =>
      expanded ? "translateX(0)" : "translateX(100%)"};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;
const StyledLink = styled.a`
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ active }) => (active ? "#000" : "")};
  }

  @media (max-width: 768px) {
    &::after {
      background-color: ${({ active }) => (active ? "#fff" : "")};
    }
  }
`;

const LinkList = () => {
  const { user, signout } = useAuth();
  const { expanded } = useNavState();
  const router = useRouter();
  const currentRoute = router.pathname;

  const userIdFromPath = router.query?.user;

  return (
    <StyledLinkList expanded={expanded} active={false}>
      <>
        <li>
          <Link href="/">
            <StyledLink active={currentRoute === "/"}>Home</StyledLink>
          </Link>
        </li>
      </>
      {!user && (
        <>
          <li>
            <Link href="/users">
              <StyledLink
                active={
                  currentRoute === "/users" || currentRoute === "/users/[user]"
                }
              >
                Traders
              </StyledLink>
            </Link>
          </li>
          <li>
            <Link href={"/login"}>
              <StyledLink active={currentRoute === "/login"}>Login</StyledLink>
            </Link>
          </li>
          <li>
            <Link href={"/register"}>
              <StyledLink active={currentRoute === "/register"}>
                Register
              </StyledLink>
            </Link>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <Link href="/users">
              <StyledLink
                active={
                  userIdFromPath === user.id.toString()
                    ? false
                    : currentRoute === "/users" ||
                      currentRoute === "/users/[user]"
                }
              >
                Traders
              </StyledLink>
            </Link>
          </li>
          <li>
            <Link href={`/users/${user.id}`}>
              <StyledLink active={userIdFromPath === user.id.toString()}>
                Profile
              </StyledLink>
            </Link>
          </li>
          <li onClick={signout}>
            <StyledLink active={false}>Logout</StyledLink>
          </li>
        </>
      )}
    </StyledLinkList>
  );
};

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ expanded }) => (expanded ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ expanded }) =>
        expanded ? "rotate(45deg)" : "rotate(0)"};
    }
    &:nth-child(2) {
      transform: ${({ expanded }) =>
        expanded ? "translateX(100%)" : "translateX(0)"};
      opacity: ${({ expanded }) => (expanded ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ expanded }) =>
        expanded ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

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
      <LinkList />
    </>
  );
};

const StyledNav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    padding: 15px 0;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <h1>Public Trader</h1>
      <Burger />
    </StyledNav>
  );
};

export default Nav;
