import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import styles from "./[id].module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { ItemDetail } from "@/components/ItemDetail/ItemDetail";
import { ItemList } from "@/components/ItemList/ItemList";
import { SegmentLink } from "@/components/SegmentLink/SegmentLink";
import {
  getAbsoluteUrl,
  getBaseUrl,
  getItem,
  getItems,
  getLabel,
  getSegment,
  sortByFeaturedAndTitle,
} from "@/lib/data";
import { formatTitle, htmlToText, limitTextLength } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const ItemPage: CustomPage = () => {
  const { query } = useRouter();
  const segment = getSegment(query.segment as string);
  const item = getItem(query.id as string);

  const relatedItems = useMemo(() => {
    return getItems()
      .filter((i) => i.segment === segment?.id && i.ring == item?.ring)
      .sort(sortByFeaturedAndTitle);
  }, [segment?.id, item?.ring]);

  if (!segment || !item) return null;
  const trimmedItemBody = limitTextLength(htmlToText(item?.body ?? ""), 100);

  return (
    <>
      <Head>
        <title>{formatTitle(item.title, segment.title)}</title>
        <meta name="description" content={segment.description} />
        <meta
          name="og:title"
          property="og:title"
          content={formatTitle(item.title, segment.title)}
        />
        <meta
          name="og:description"
          property="og:description"
          content={trimmedItemBody}
        />
        <meta
          name="og:image"
          property="og:image"
          content={getAbsoluteUrl(`${segment.id}/${item.id}/opengraph-image`)}
        />
        <meta
          name="og:url"
          property="og:url"
          content={getAbsoluteUrl(segment.id)}
        />
      </Head>

      <div className={styles.layout}>
        <section className={styles.content}>
          <ItemDetail item={item} />
        </section>
        <aside className={styles.sidebar}>
          <h3>{segment.title}</h3>
          <div className={styles.ringAndSegment}>
            <RingBadge ring={item.ring} />
            <SegmentLink
              segment={segment}
              label={getLabel("segmentOverview")}
            />
          </div>

          <ItemList items={relatedItems} activeId={item.id} />
        </aside>
      </div>
    </>
  );
};

export default ItemPage;

export const getStaticPaths = async () => {
  const items = getItems();
  const paths = items.map((item) => ({
    params: { segment: item.segment, id: item.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async () => {
  return { props: {} };
};
