import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useAuth } from "lib/contexts/authContext";
import styled from "styled-components";
import { useNavState } from "lib/contexts/navContext";
import Burger from "components/atoms/Burger/Burger";
import StyledNav from "./StyledNav";
import { walletSchema } from "lib/consts";
import Select from "components/molecules/Select/Select";
import Logo from "components/atoms/Logo/Logo";
import { capitalizeFirstLetter } from "lib/utils";

const StyledLink = styled(Link)`
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

const Nav = () => {
  const { user, signout } = useAuth();
  const { expanded } = useNavState();
  const router = useRouter();

  const marketFromUrl = router.query?.market;

  const selectOptions = walletSchema.reduce(
    (acc, item) => {
      const { key, currency } = item;
      if (key === "usd") return acc;
      return [
        ...acc,
        {
          title: capitalizeFirstLetter(currency),
          key,
          attributes: marketFromUrl === key && { selected: "true" },
        },
      ];
    },
    [
      {
        title: "Markets",
        attributes: {
          disabled: "disabled",
          selected: !marketFromUrl,
        },
      },
    ]
  );

  const handleSelectChange = ({ target: { value } }) =>
    Router.push(`/markets/${value}`);

  const displayLinksList = () => {
    const staticRoutes = [
      <li>
        <StyledLink href="/">Home</StyledLink>
      </li>,
      <li>
        <StyledLink href="/users">Traders</StyledLink>
      </li>,
      <li>
        <Select options={selectOptions} handleChange={handleSelectChange} />
      </li>,
    ];
    const unauthorizedRoutes = [
      <li>
        <StyledLink href="/login">Login</StyledLink>
      </li>,
      <li>
        <StyledLink href="/register">Register</StyledLink>
      </li>,
    ];

    if (!user)
      return (
        <StyledLinkList expanded={expanded}>
          {[...staticRoutes, ...unauthorizedRoutes]}
        </StyledLinkList>
      );

    const authorizedRoutes = [
      <li>
        <StyledLink href={`/users/${user.id}`}>Profile</StyledLink>
      </li>,
      <li>
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
