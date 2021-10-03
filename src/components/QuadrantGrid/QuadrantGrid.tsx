import React from "react";
import { groupByQuadrants, Item, Group } from "../../model";
import { ConfigData } from "../../config";
import QuadrantSection from "../QuadrantSection/QuadrantSection";
import "./quadrant-grid.scss";
const renderQuadrant = (quadrantName: string, groups: Group, config: ConfigData) => {
  return (
    <div key={quadrantName} className="quadrant-grid__quadrant">
      <QuadrantSection quadrantName={quadrantName} groups={groups} config={config} />
    </div>
  );
};

export default function QuadrantGrid({ items, config }: { items: Item[], config: ConfigData }) {
  const groups = groupByQuadrants(items);
  return (
    <div className="quadrant-grid">
      {Object.keys(config.quadrants).map((quadrantName: string) => renderQuadrant(quadrantName, groups, config))}
    </div>
  );
}
