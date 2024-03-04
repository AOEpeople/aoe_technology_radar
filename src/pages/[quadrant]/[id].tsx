import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import styles from "./[id].module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { ItemDetail } from "@/components/ItemDetail/ItemDetail";
import { ItemList } from "@/components/ItemList/ItemList";
import { QuadrantLink } from "@/components/QuadrantLink/QuadrantLink";
import {
  getItem,
  getItems,
  getLabel,
  getQuadrant,
  sortByFeaturedAndTitle,
} from "@/lib/data";
import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const ItemPage: CustomPage = () => {
  const { query } = useRouter();
  const quadrant = getQuadrant(query.quadrant as string);
  const item = getItem(query.id as string);

  const relatedItems = useMemo(() => {
    return getItems()
      .filter((i) => i.quadrant === quadrant?.id && i.ring == item?.ring)
      .sort(sortByFeaturedAndTitle);
  }, [quadrant?.id, item?.ring]);

  if (!quadrant || !item) return null;

  return (
    <>
      <Head>
        <title>{formatTitle(item.title, quadrant.title)}</title>
        <meta name="description" content={quadrant.description} />
      </Head>

      <div className={styles.layout}>
        <section className={styles.content}>
          <ItemDetail item={item} />
        </section>
        <aside className={styles.sidebar}>
          <h3>{quadrant.title}</h3>
          <div className={styles.ringAndQuadrant}>
            <RingBadge ring={item.ring} />
            <QuadrantLink
              quadrant={quadrant}
              label={getLabel("quadrantOverview")}
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
    params: { quadrant: item.quadrant, id: item.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async () => {
  return { props: {} };
};
