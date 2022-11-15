import * as d3 from "d3";
import React from "react";
import ReactTooltip from "react-tooltip";

import { ConfigData } from "../../config";
import { Item } from "../../model";
import { XAxis, YAxis } from "./Axes";
import BlipPoints from "./BlipPoints";
import QuadrantRings from "./QuadrantRings";
import "./chart.scss";

const RingLabel: React.FC<{
  ring: string;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  config: ConfigData;
}> = ({ ring, xScale, yScale, config }) => {
  const ringIndex = config.rings.findIndex((r) => r === ring);

  const ringRadius = config.chartConfig.ringsAttributes[ringIndex].radius,
    previousRingRadius =
      ringIndex === 0
        ? 0
        : config.chartConfig.ringsAttributes[ringIndex - 1].radius,
    // middle point in between two ring arcs
    distanceFromCentre =
      previousRingRadius + (ringRadius - previousRingRadius) / 2;

  return (
    <g className="ring-label">
      {/* Right hand-side label */}
      <text
        x={xScale(distanceFromCentre)}
        y={yScale(0)}
        textAnchor="middle"
        dy=".35em"
      >
        {ring}
      </text>
      {/* Left hand-side label */}
      <text
        x={xScale(-distanceFromCentre)}
        y={yScale(0)}
        textAnchor="middle"
        dy=".35em"
      >
        {ring}
      </text>
    </g>
  );
};

const RadarChart: React.FC<{
  items: Item[];
  config: ConfigData;
}> = ({ items, config }) => {
  const xScale = d3
    .scaleLinear()
    .domain(config.chartConfig.scale)
    .range([0, config.chartConfig.size]);
  const yScale = d3
    .scaleLinear()
    .domain(config.chartConfig.scale)
    .range([config.chartConfig.size, 0]);

  return (
    <div className="chart" style={{ maxWidth: `${config.chartConfig.size}px` }}>
      <svg
        viewBox={`0 0 ${config.chartConfig.size} ${config.chartConfig.size}`}
      >
        <g transform={`translate(${xScale(0)}, 0)`}>
          <YAxis scale={yScale} />
        </g>
        <g transform={`translate(0, ${yScale(0)})`}>
          <XAxis scale={xScale} />
        </g>

        {Object.values(config.quadrantsMap).map((value, index) => {
          console.log(value)
          return null
        })}
        {Object.values(config.quadrantsMap).map((value, index) => (
          <QuadrantRings
            key={index}
            quadrant={value}
            xScale={xScale}
            config={config}
          />
        ))}

        {Array.from(config.rings).map((ring: string, index) => (
          <RingLabel
            key={index}
            ring={ring}
            xScale={xScale}
            yScale={yScale}
            config={config}
          />
        ))}

        <BlipPoints
          items={items}
          xScale={xScale}
          yScale={yScale}
          config={config}
        />
      </svg>
      <ReactTooltip className="tooltip" offset={{ top: -5 }} />
    </div>
  );
};

export default RadarChart;
