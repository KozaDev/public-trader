import Head from "next/head";
import Nav from "../../organisms/Nav/Nav";
import StyledLayout from "./StyledLayout";

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
