import Head from "next/head";

import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const HelpAndAbout: CustomPage = () => {
  return (
    <>
      <Head>
        <title>{formatTitle("Help and About")}</title>
      </Head>

      <h1>Help and about</h1>
    </>
  );
};

export default HelpAndAbout;
