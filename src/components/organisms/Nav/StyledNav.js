import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
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

export const StyledLinkList = styled.ul`
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

export const StyledNav = styled.nav`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    padding: 15px 0;
  }
`;
