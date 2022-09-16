import { GlobalStyle } from "styles/globals";
import { theme } from "styles/theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "lib/contexts/authContext";
import { NavStateProvider } from "lib/contexts/navContext";
import { PricesStateProvider } from "lib/contexts/pricesProvider";
import Layout from "components/templates/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavStateProvider>
        <PricesStateProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PricesStateProvider>
      </NavStateProvider>
    </AuthProvider>
  );
}

export default MyApp;
