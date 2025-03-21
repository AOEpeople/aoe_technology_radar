import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { Layout, type LayoutClass } from "@/components/Layout/Layout";
import {
  getAbsoluteUrl,
  getBaseUrl,
  getDescription,
  getJsUrl,
} from "@/lib/data";
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
        <meta name="og:title" property="og:title" content={formatTitle()} />
        <meta
          name="og:description"
          property="og:description"
          content={getDescription()}
        />
        <meta
          name="og:image"
          property="og:image"
          content={`${getBaseUrl()}opengraph-image`}
        />
        <meta
          property="og:image:secure_url"
          content={`${getBaseUrl()}opengraph-image`}
        />
        <meta name="og:url" property="og:url" content={getAbsoluteUrl()} />
        <meta name="og:type" property="og:type" content="website" />
        <link rel="icon" href={assetUrl("/favicon.ico")} />
      </Head>
      <Layout layoutClass={Component.layoutClass}>
        <Component {...pageProps} />
        {jsUrl && <Script src={jsUrl} />}
      </Layout>
    </>
  );
}
