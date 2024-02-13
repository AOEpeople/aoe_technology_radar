import Head from "next/head";
import { useRouter } from "next/router";

import { getQuadrant, getQuadrants } from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const QuadrantPage: CustomPage = () => {
  const { query } = useRouter();
  const quadrant = getQuadrant(query.quadrant as string);
  return (
    <>
      <Head>
        <title>Quadrant Page</title>
      </Head>

      <h1>Quadrant: {query.quadrant}</h1>
      <pre>{JSON.stringify(quadrant)}</pre>
    </>
  );
};

export default QuadrantPage;

export const getStaticPaths = async () => {
  const quadrants = getQuadrants();
  const paths = quadrants.map((quadrant) => ({
    params: { quadrant: quadrant.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async () => {
  return { props: {} };
};
