import { useEffect, useState } from "react";

import { ConfigData, getItemPageNames, isMobileViewport } from "../config";
import { Item } from "../model";
import PageHelp from "./PageHelp/PageHelp";
import PageIndex from "./PageIndex/PageIndex";
import PageItem from "./PageItem/PageItem";
import PageItemMobile from "./PageItemMobile/PageItemMobile";
import PageOverview from "./PageOverview/PageOverview";
import PageQuadrant from "./PageQuadrant/PageQuadrant";

type RouterProps = {
  pageName: string;
  items: Item[];
  releases: string[];
  search: string;
  config: ConfigData;
};

enum page {
  index,
  overview,
  help,
  quadrant,
  itemMobile,
  item,
  notFound,
}

const getPageByName = (
  items: Item[],
  pageName: string,
  config: ConfigData
): page => {
  if (pageName === "index") {
    return page.index;
  }
  if (pageName === "overview") {
    return page.overview;
  }
  if (pageName === "help-and-about-tech-radar") {
    return page.help;
  }
  if (Object.keys(config.quadrants).includes(pageName)) {
    return page.quadrant;
  }
  if (getItemPageNames(items).includes(pageName)) {
    return isMobileViewport() ? page.itemMobile : page.item;
  }

  return page.notFound;
};

export default function Router({
  pageName,
  items,
  releases,
  search,
  config,
}: RouterProps) {
  const [statePageName, setStatePageName] = useState(pageName);
  const [leaving, setLeaving] = useState(false);
  const [nextPageName, setNextPageName] = useState<string>("");

  useEffect(() => {
    const nowLeaving =
      getPageByName(items, pageName, config) !==
      getPageByName(items, statePageName, config);
    if (nowLeaving) {
      setLeaving(true);
      setNextPageName(pageName);
    } else {
      setStatePageName(pageName);
    }
  }, [pageName, items, config, statePageName]);

  const handlePageLeave = () => {
    setStatePageName(nextPageName);
    setNextPageName("");

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setLeaving(false);
      });
    }, 0);
  };

  switch (getPageByName(items, statePageName, config)) {
    case page.index:
      return (
        <PageIndex
          leaving={leaving}
          items={items}
          config={config}
          onLeave={handlePageLeave}
          releases={releases}
        />
      );
    case page.overview:
      return (
        <PageOverview
          items={items}
          config={config}
          rings={config.rings}
          search={search}
          leaving={leaving}
          onLeave={handlePageLeave}
        />
      );
    case page.help:
      return <PageHelp leaving={leaving} onLeave={handlePageLeave} />;
    case page.quadrant:
      return (
        <PageQuadrant
          leaving={leaving}
          onLeave={handlePageLeave}
          items={items}
          config={config}
          pageName={statePageName}
        />
      );
    case page.itemMobile:
      return (
        <PageItemMobile
          items={items}
          config={config}
          pageName={statePageName}
          leaving={leaving}
          onLeave={handlePageLeave}
        />
      );
    case page.item:
      return (
        <PageItem
          items={items}
          config={config}
          pageName={statePageName}
          leaving={leaving}
          onLeave={handlePageLeave}
        />
      );
    default:
      return <div />;
  }
}
