import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Layout, type LayoutClass } from "@/components/Layout/Layout";
import { formatTitle } from "@/lib/format";
import { assetUrl } from "@/lib/utils";
import "@/styles/globals.css";

export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  layoutClass?: LayoutClass;
};

type CustomAppProps = AppProps & {
  Component: CustomPage;
};

export default function App({ Component, pageProps, router }: CustomAppProps) {
  return (
    <>
      <Head>
        <title>{formatTitle()}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={assetUrl("/favicon.ico")} />
      </Head>
      <Layout layoutClass={Component.layoutClass}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
