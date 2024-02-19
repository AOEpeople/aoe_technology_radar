import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { Filter } from "@/components/Filter/Filter";
import { ItemList } from "@/components/ItemList/ItemList";
import { getItems } from "@/lib/data";
import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const Overview: CustomPage = () => {
  const router = useRouter();
  const ring = router.query.ring as string | undefined;
  const query = router.query.query as string | undefined;

  const onRingChange = useCallback(
    (ring: string) => {
      router.push({ query: { ...router.query, ring, query } });
    },
    [router, query],
  );

  const onQueryChange = useCallback(
    (query: string) => {
      router.replace({ query: { ...router.query, ring, query } });
    },
    [router, ring],
  );

  const items = useMemo(() => {
    if (!ring && !query) return getItems();
    return getItems().filter((item) => {
      if (ring && item.ring !== ring) return false;
      return !(
        query && !item.title.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, ring]);

  return (
    <>
      <Head>
        <title>{formatTitle("Technologies Overview")}</title>
      </Head>

      <h1>Technologies Overview</h1>
      <Filter
        query={query}
        ring={ring}
        onRingChange={onRingChange}
        onQueryChange={onQueryChange}
      />

      <ItemList items={items} />
    </>
  );
};

export default Overview;
