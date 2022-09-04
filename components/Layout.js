import Head from "next/head";
import Nav from "./Nav";
import styled from "styled-components";

const StyledLayout = styled.div`
  padding: 20px;
  max-width: 968px;
  margin: auto;

  main {
    margin: 20px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Public Trader</title>
      </Head>
      <StyledLayout>
        <Nav />
        <main>{children}</main>
      </StyledLayout>
    </>
  );
};

export default Layout;
