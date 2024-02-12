import { NextPage } from "next";
import type { AppProps } from "next/app";

import { Layout, type LayoutClass } from "@/components/Layout/Layout";
import "@/styles/globals.css";

export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  layoutClass?: LayoutClass;
};

type CustomAppProps = AppProps & {
  Component: CustomPage;
};

export default function App({ Component, pageProps, router }: CustomAppProps) {
  return (
    <Layout layoutClass={Component.layoutClass}>
      <Component {...pageProps} key={router.asPath} />
    </Layout>
  );
}
