import Head from "next/head";
import { useRouter } from "next/router";

import { DepartmentFilter } from "@/components/Departments/DepartmentFilter";
import { QuadrantList } from "@/components/QuadrantList/QuadrantList";
import { Radar } from "@/components/Radar/Radar";
import { Tags } from "@/components/Tags/Tags";
import {
  getAppName,
  getChartConfig,
  getDepartments,
  getFilteredItems,
  getLabel,
  getQuadrants,
  getReleases,
  getRings,
  getSections,
  getTags,
  getToggle,
} from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Home: CustomPage = () => {
  const router = useRouter();
  const tag = router.query.tag as string | undefined;
  const department = router.query.department as string | undefined;
  const appName = getAppName();
  const metaDescription = getLabel("metaDescription");
  const chartConfig = getChartConfig();
  const sections = getSections();
  const version = getReleases().length;
  const rings = getRings();
  const quadrants = getQuadrants();
  const tags = getTags();
  const departments = getDepartments();
  const items = getFilteredItems(tag, department);

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
          case "tags":
            return (
              getToggle("showTagFilter") &&
              tags.length > 0 && (
                <Tags key={section} tags={tags} activeTag={tag} />
              )
            );
          case "list":
            return (
              getToggle("showQuadrantList") && (
                <QuadrantList key={section} items={items} />
              )
            );
          case "departments":
            return (
              getToggle("showDepartmentFilter") &&
              departments.length > 0 && (
                <DepartmentFilter key={section} activeDepartment={department} />
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
