import { GlobalStyle } from "styles/globals";
import { theme } from "styles/theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "lib/contexts/authContext";
import { NavStateProvider } from "lib/contexts/navContext";
import { PricesStateProvider } from "lib/contexts/pricesProvider";
import { useRouter } from "next/router";
import Layout from "components/templates/Layout/Layout";
import PageError from "components/templates/PageError/PageError";
import { useState, useEffect } from "react";
import Spinner from "components/templates/Spinner/Spinner";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url, { shallow }) => {
      if (!shallow) setLoading(true);
    };
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  const displayApp = () => {
    if (loading) return <Spinner margin="200px 0" />;
    if (pageProps?.error?.isError)
      return <PageError error={pageProps.error.error} />;
    return <Component {...pageProps} />;
  };

  return (
    <AuthProvider>
      <NavStateProvider>
        <PricesStateProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>{displayApp()}</Layout>
          </ThemeProvider>
        </PricesStateProvider>
      </NavStateProvider>
    </AuthProvider>
  );
}

export default MyApp;
