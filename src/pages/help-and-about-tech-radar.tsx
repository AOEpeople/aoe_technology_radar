import Head from "next/head";

import about from "../../data/about.json";

import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const HelpAndAbout: CustomPage = () => {
  return (
    <>
      <Head>
        <title>{formatTitle("Help and About")}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: about.body }} />
    </>
  );
};

export default HelpAndAbout;
