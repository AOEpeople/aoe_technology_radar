import Head from "next/head";

import { CustomPage } from "@/pages/_app";

const HelpAndAbout: CustomPage = () => {
  return (
    <>
      <Head>
        <title>Help and About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Help and about</h1>
    </>
  );
};

export default HelpAndAbout;
