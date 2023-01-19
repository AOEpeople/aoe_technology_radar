import { ConfigData, translate } from "../../config";
import { Group } from "../../model";
import Badge from "../Badge/Badge";
import Flag from "../Flag/Flag";
import ItemList from "../ItemList/ItemList";
import Link from "../Link/Link";
import "./quadrant-section.scss";

const renderList = (
  ringName: string,
  quadrantName: string,
  groups: Group,
  config: ConfigData,
  big: boolean
) => {
  const itemsInRing = groups[quadrantName][ringName] || [];

  if (big) {
    return (
      <ItemList items={itemsInRing} noLeadingBorder>
        <Badge type={ringName} big={big} config={config}>
          {ringName}
        </Badge>
      </ItemList>
    );
  }

  return (
    <div className="ring-list">
      <div className="ring-list__header">
        <Badge type={ringName} config={config}>
          {ringName}
        </Badge>
      </div>
      {itemsInRing.map((item) => (
        <span key={item.name} className="ring-list__item">
          <Link className="link" pageName={`${item.quadrant}/${item.name}`}>
            {item.title}
            <Flag item={item} short />
          </Link>
        </span>
      ))}
    </div>
  );
};

const renderRing = (
  ringName: string,
  quadrantName: string,
  groups: Group,
  config: ConfigData,
  big: boolean
) => {
  if (
    !config.showEmptyRings &&
    (!groups[quadrantName] ||
      !groups[quadrantName][ringName] ||
      groups[quadrantName][ringName].length === 0)
  ) {
    return null;
  }
  return (
    <div key={ringName} className="quadrant-section__ring">
      {renderList(ringName, quadrantName, groups, config, big)}
    </div>
  );
};

export default function QuadrantSection({
  quadrantName,
  groups,
  config,
  big = false,
}: {
  quadrantName: string;
  groups: Group;
  config: ConfigData;
  big?: boolean;
}) {
  return (
    <div className="quadrant-section">
      <div className="quadrant-section__header">
        <div className="split">
          <div className="split__left">
            <h4 className="headline">{translate(config, quadrantName)}</h4>
          </div>
          {!big && (
            <div className="split__right">
              <Link className="icon-link" pageName={`${quadrantName}`}>
                <span className="icon icon--pie icon-link__icon" />
                Zoom In
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="quadrant-section__rings">
        {config.rings.map((ringName: string) =>
          renderRing(ringName, quadrantName, groups, config, big)
        )}
      </div>
    </div>
  );
}
