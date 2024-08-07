import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { Layout, type LayoutClass } from "@/components/Layout/Layout";
import { getJsUrl } from "@/lib/data";
import { formatTitle } from "@/lib/format";
import { assetUrl } from "@/lib/utils";
import "@/styles/_globals.css";
import "@/styles/_hljs.css";
import "@/styles/custom.css";

export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  layoutClass?: LayoutClass;
};

type CustomAppProps = AppProps & {
  Component: CustomPage;
};

export default function App({ Component, pageProps, router }: CustomAppProps) {
  const jsUrl = getJsUrl();
  return (
    <>
      <Head>
        <title>{formatTitle()}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={assetUrl("/favicon.ico")} />
      </Head>
      <Layout layoutClass={Component.layoutClass}>
        <Component {...pageProps} />
        {jsUrl && <Script src={jsUrl} />}
      </Layout>
    </>
  );
}
