import Head from "next/head";
import { useRouter } from "next/router";

import { Radar } from "@/components/Radar/Radar";
import { SegmentList } from "@/components/SegmentList/SegmentList";
import { Tags } from "@/components/Tags/Tags";
import {
  getAppName,
  getChartConfig,
  getItems,
  getLabel,
  getReleases,
  getRings,
  getSections,
  getSegments,
  getTags,
  getToggle,
} from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Home: CustomPage = () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  const appName = getAppName();
  const metaDescription = getLabel("metaDescription");
  const subTitle = "subtitle";
  const chartConfig = getChartConfig();
  const sections = getSections();
  const version = getReleases().length;
  const rings = getRings();
  const segments = getSegments();
  const tags = getTags();
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
      {subTitle && <h2 className="subtitle">{subTitle}</h2>}
      {sections.map((section) => {
        switch (section) {
          case "radar":
            return (
              getToggle("showChart") && (
                <Radar
                  key={section}
                  size={chartConfig.size}
                  segments={segments}
                  rings={rings}
                  items={items}
                />
              )
            );
          case "tags":
            return (
              getToggle("showTagFilter") &&
              tags.length > 0 && (
                <Tags key={section} tags={tags} activeTag={tag} />
              )
            );
          case "list":
            return (
              getToggle("showSegmentList") && (
                <SegmentList key={section} items={items} />
              )
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Home;
