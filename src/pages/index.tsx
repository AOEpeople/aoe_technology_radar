import { ItemList } from "@/components/ItemList/ItemList";
import { getAppName, getItems, getReleases } from "@/lib/data";
import { CustomPage } from "@/pages/_app";

const Home: CustomPage = () => {
  const appName = getAppName();
  const version = getReleases().length;
  return (
    <>
      <h1>
        {appName}{" "}
        <span style={{ color: "var(--highlight)" }}>Version #{version}</span>
      </h1>
      <ItemList items={getItems()} />
    </>
  );
};

export default Home;
