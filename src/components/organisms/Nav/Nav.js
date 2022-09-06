import Router, { useRouter } from "next/router";
import { useAuth } from "lib/contexts/authContext";
import { useNavState } from "lib/contexts/navContext";
import Burger from "components/atoms/Burger/Burger";
import { walletSchema } from "lib/consts/consts";
import Select from "components/molecules/Select/Select";
import Logo from "components/atoms/Logo/Logo";
import { capitalizeFirstLetter } from "lib/utils/utils";
import { StyledLink, StyledLinkList, StyledNav } from "./StyledNav";

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
          value: key,
          attributes: { selected: marketFromUrl === key },
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
