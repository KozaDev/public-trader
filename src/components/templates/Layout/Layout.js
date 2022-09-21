import Head from "next/head";
import Nav from "../../organisms/Nav/Nav";
import StyledLayout from "./StyledLayout";
import { nodeChild } from "lib/proptypes/proptypes";

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

Layout.propTypes = {
  children: nodeChild,
};

export default Layout;
