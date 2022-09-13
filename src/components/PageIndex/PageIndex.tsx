import { MomentInput } from "moment";

import { ConfigData, radarName, radarNameShort } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { formatRelease } from "../../date";
import { HomepageOption, Item, featuredOnly } from "../../model";
import Fadeable from "../Fadeable/Fadeable";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import QuadrantGrid from "../QuadrantGrid/QuadrantGrid";
import RadarGrid from "../RadarGrid/RadarGrid";
import SetTitle from "../SetTitle";

type PageIndexProps = {
  leaving: boolean;
  onLeave: () => void;
  items: Item[];
  config: ConfigData;
  releases: MomentInput[];
};

export default function PageIndex({
  leaving,
  onLeave,
  items,
  config,
  releases,
}: PageIndexProps) {
  const { pageIndex } = useMessages();
  const publishedLabel = pageIndex?.publishedLabel || "Published";

  const newestRelease = releases.slice(-1)[0];
  const numberOfReleases = releases.length;
  const showChart =
    config.homepageContent === HomepageOption.chart ||
    config.homepageContent === HomepageOption.both;
  const showColumns =
    config.homepageContent === HomepageOption.columns ||
    config.homepageContent === HomepageOption.both;
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={radarNameShort} />
      <div className="headline-group">
        <HeroHeadline alt={`Version #${numberOfReleases}`}>
          {radarName}
        </HeroHeadline>
      </div>
      {showChart && <RadarGrid items={featuredOnly(items)} config={config} />}
      {showColumns && (
        <QuadrantGrid items={featuredOnly(items)} config={config} />
      )}
      <div className="publish-date">
        {publishedLabel} {formatRelease(newestRelease, config.dateFormat)}
      </div>
    </Fadeable>
  );
}
