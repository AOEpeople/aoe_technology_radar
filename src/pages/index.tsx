import { QuadrantList } from "@/components/QuadrantList/QuadrantList";
import { Radar } from "@/components/Radar/Radar";
import {
  getAppName,
  getItems,
  getQuadrants,
  getReleases,
  getRings,
} from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Home: CustomPage = () => {
  const appName = getAppName();
  const version = getReleases().length;
  const rings = getRings();
  const quadrants = getQuadrants();
  const items = getItems(undefined, true);
  return (
    <>
      <h1>
        {appName}{" "}
        <span style={{ color: "var(--highlight)", whiteSpace: "nowrap" }}>
          Version #{version}
        </span>
      </h1>
      <Radar quadrants={quadrants} rings={rings} items={items} />
      <QuadrantList items={items} />
    </>
  );
};

export default Home;
