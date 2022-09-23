import { useRouter } from "next/router";
import uuid from "react-uuid";
import { useAuth } from "lib/contexts/authContext";
import { useNavState } from "lib/contexts/navContext";
import Burger from "components/atoms/Burger/Burger";
import Logo from "components/atoms/Logo/Logo";
import { StyledLinkList, StyledNav } from "./StyledNav";
import NavSelect from "components/molecules/NavSelect/NavSelect";
import Link from "next/link";

const Nav = () => {
  const { user, signout } = useAuth();
  const { expanded, toggle } = useNavState();
  const router = useRouter();

  const isHomePage = router.route === "/";
  const isUserOnHisOwnProfile = router.query?.user == user?.id;

  const isUsersPage = () => {
    if (router.route === "/users" && !router.query?.user) return true;
    if (router.route === "/users" && !isUserOnHisOwnProfile) return true;
    return false;
  };
  const isLoginPage = router.route === "/login";
  const isRegisterPage = router.route === "/register";

  const activeClass = (active) => ({
    className: active ? "active" : undefined,
  });

  const displayLinksList = () => {
    const staticRoutes = [
      <li
        {...activeClass(isHomePage)}
        key={uuid()}
        onClick={toggle.bind(null, false)}
      >
        <Link href="/">Home</Link>
      </li>,
      <li
        {...activeClass(isUsersPage())}
        key={uuid()}
        onClick={toggle.bind(null, false)}
      >
        <Link href="/users">Traders</Link>
      </li>,
      <li key={uuid()}>
        <NavSelect toggle={toggle} />
      </li>,
    ];
    const unauthorizedRoutes = [
      <li
        {...activeClass(isLoginPage)}
        key={uuid()}
        onClick={toggle.bind(null, false)}
      >
        <Link href="/login">Login</Link>
      </li>,
      <li
        {...activeClass(isRegisterPage)}
        key={uuid()}
        onClick={toggle.bind(null, false)}
      >
        <Link href="/register">Register</Link>
      </li>,
    ];

    if (!user)
      return (
        <StyledLinkList expanded={expanded}>
          {[...staticRoutes, ...unauthorizedRoutes]}
        </StyledLinkList>
      );

    const authorizedRoutes = [
      <li
        {...activeClass(isUserOnHisOwnProfile)}
        key={uuid()}
        onClick={toggle.bind(null, false)}
      >
        <Link href={`/users/${user.id}`}>Profile</Link>
      </li>,
      <li key={uuid()} onClick={toggle.bind(null, false)}>
        <a onClick={signout}>Signout</a>
      </li>,
    ];

    return (
      <StyledLinkList expanded={expanded}>
        {[...staticRoutes, ...authorizedRoutes]}
      </StyledLinkList>
    );
  };

  return (
    <StyledNav>
      <Logo />
      {displayLinksList()}
      <Burger />
    </StyledNav>
  );
};

export default Nav;
