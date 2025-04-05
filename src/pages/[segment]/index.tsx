import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { RingList } from "@/components/RingList/RingList";
import {
  getAbsoluteUrl,
  getBaseUrl,
  getItems,
  getSegment,
  getSegments,
  sortByFeaturedAndTitle,
} from "@/lib/data";
import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const SegmentPage: CustomPage = () => {
  const { query } = useRouter();
  const segment = getSegment(query.segment as string);
  const items = useMemo(
    () => segment?.id && getItems(segment.id).sort(sortByFeaturedAndTitle),
    [segment?.id],
  );
  if (!segment || !items) return null;

  return (
    <>
      <Head>
        <title>{formatTitle(segment.title)}</title>
        <meta name="description" content={segment.description} />
        <meta
          name="og:title"
          property="og:title"
          content={formatTitle(segment.title)}
        />
        <meta
          name="og:description"
          property="og:description"
          content={segment.description}
        />
        <meta
          name="og:image"
          property="og:image"
          content={getAbsoluteUrl(`/${segment.id}/opengraph-image`)}
        />
        <meta
          name="og:url"
          property="og:url"
          content={getAbsoluteUrl(segment.id)}
        />
      </Head>

      <h1>{segment.title}</h1>
      <h2>{segment.description}</h2>

      <RingList items={items} />
    </>
  );
};

export default SegmentPage;

export const getStaticPaths = async () => {
  const segments = getSegments();
  const paths = segments.map((segment) => ({
    params: { segment: segment.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async () => {
  return { props: {} };
};
