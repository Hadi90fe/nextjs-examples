import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notification-context";
import { ThemeModeContextProvider } from "../store/thememode-context";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeModeContextProvider>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Next Events</title>
            <meta name="description" content="NextJS Events" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </ThemeModeContextProvider>
  );
}

export default MyApp;
