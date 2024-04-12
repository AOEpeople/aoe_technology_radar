import Head from "next/head";
import { useRouter } from "next/router";

import { ItemDetailedList } from "@/components/ItemDetailedList/ItemDetailedList";
import { QuadrantList } from "@/components/QuadrantList/QuadrantList";
import { Radar } from "@/components/Radar/Radar";
import {
  getAppName,
  getChartConfig,
  getItems,
  getLabel,
  getQuadrants,
  getReleases,
  getRings,
  getSections,
  getToggle,
} from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Catalogue: CustomPage = () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  const appName = getAppName();
  const metaDescription = getLabel("metaDescription");
  const chartConfig = getChartConfig();
  const sections = getSections();
  const version = getReleases().length;
  const rings = getRings();
  const quadrants = getQuadrants();
  const items = getItems(undefined, true).filter(
    (item) => !tag || item.tags?.includes(tag),
  );

  return (
    <>
      <Head>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Head>

      <h1>
        {appName}{" "}
        <span style={{ color: "var(--highlight)", whiteSpace: "nowrap" }}>
          Version #{version}
        </span>
      </h1>
      {sections.map((section) => {
        switch (section) {
          case "radar":
            return (
              getToggle("showChart") && (
                <Radar
                  key={section}
                  size={chartConfig.size}
                  quadrants={quadrants}
                  rings={rings}
                  items={items}
                />
              )
            );
          case "list":
            return (
              getToggle("showQuadrantList") && (
                <QuadrantList key={section} items={items} />
              )
            );
          default:
            return null;
        }
      })}

      {quadrants.map((quadrant) => {
        return (
          <>
            <h1>{quadrant.title}</h1>
            <h2>{quadrant.description}</h2>

            <ItemDetailedList
              key={quadrant.id}
              items={items.filter((item) => item.quadrant === quadrant.id)}
            />
          </>
        );
      })}
    </>
  );
};

export default Catalogue;
