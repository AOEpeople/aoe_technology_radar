import { formatRelease } from "../../date";
import { featuredOnly, Item } from "../../model";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import QuadrantGrid from "../QuadrantGrid/QuadrantGrid";
import Fadeable from "../Fadeable/Fadeable";
import SetTitle from "../SetTitle";
import { ConfigData, radarName, radarNameShort } from "../../config";
import { MomentInput } from "moment";
import { useMessages } from "../../context/MessagesContext";

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
  const publishedLabel = pageIndex?.publishedLabel || 'Published';

  const newestRelease = releases.slice(-1)[0];
  const numberOfReleases = releases.length;
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={radarNameShort} />
      <div className="headline-group">
        <HeroHeadline alt={`Version #${numberOfReleases}`}>
          {radarName}
        </HeroHeadline>
      </div>
      <QuadrantGrid items={featuredOnly(items)} config={config} />
      <div className="publish-date">
        {publishedLabel} {formatRelease(newestRelease)}
      </div>
    </Fadeable>
  );
}
