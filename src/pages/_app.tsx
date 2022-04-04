import "../styles/globals.css";
import "../styles/nprogress.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/providers/AuthProvider";
import { SWRConfig } from "swr";
import NProgress from "nprogress";
import { Router } from "next/router";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const delay = 500; // in milliseconds
    let timer: NodeJS.Timeout;
    const load = () => {
      timer = setTimeout(function () {
        NProgress.start();
      }, delay);
    };
    const stop = () => {
      clearTimeout(timer);
      NProgress.done();
    };
    Router.events.on("routeChangeStart", () => load());
    Router.events.on("routeChangeComplete", () => stop());
    Router.events.on("routeChangeError", () => stop());
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AuthProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </AuthProvider>
  );
}
