import React from "react";

import { ConfigData } from "../../config";
import { Item, QuadrantConfig } from "../../model";
import RadarChart from "../Chart/RadarChart";
import Link from "../Link/Link";
import "./radar-grid.scss";

const QuadrantLabel: React.FC<{
  quadrantConfig: QuadrantConfig;
  quadrantName: string;
  quadrantLabel: string;
}> = ({ quadrantConfig, quadrantName, quadrantLabel }) => {
  const stylesMap = [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, right: 0 },
    { bottom: 0, left: 0 },
  ];

  return (
    <div
      className="quadrant-label"
      style={stylesMap[quadrantConfig.position - 1]}
    >
      <div className="split">
        <div className="split__left">
          <small>Quadrant {quadrantConfig.position}</small>
        </div>
        <div className="split__right">
          <Link className="icon-link" pageName={`${quadrantName}`}>
            <span className="icon icon--pie icon-link__icon" />
            Zoom In
          </Link>
        </div>
      </div>
      <hr style={{ borderColor: quadrantConfig.colour }} />
      <h4 className="headline">{quadrantLabel}</h4>
      <div className="description">{quadrantConfig.description}</div>
    </div>
  );
};

const Legend: React.FC = () => {
  return (
    <div className="radar-legend">
      <div className="wrapper">
        <span className="icon icon--blip_new"></span>
        New in this version
      </div>
      <div className="wrapper">
        <span className="icon icon--blip_changed"></span>
        Recently changed
      </div>
      <div className="wrapper">
        <span className="icon icon--blip_default"></span>
        Unchanged
      </div>
    </div>
  );
};

const RadarGrid: React.FC<{ items: Item[]; config: ConfigData }> = ({
  items,
  config,
}) => {
  return (
    <div className="radar-grid">
      <RadarChart items={items} config={config} />
      {Object.entries(config.quadrantsMap).map(([name, quadrant], index) => (
        <QuadrantLabel
          key={index}
          quadrantConfig={quadrant}
          quadrantName={name}
          quadrantLabel={config.quadrants[name]}
        />
      ))}
      <Legend />
    </div>
  );
};

export default RadarGrid;
