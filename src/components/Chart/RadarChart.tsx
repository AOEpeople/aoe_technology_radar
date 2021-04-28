import React from 'react';
import * as d3 from "d3";
import ReactTooltip from 'react-tooltip';
import { chartConfig, quadrantsMap, ringsMap } from '../../config';
import { YAxis, XAxis } from './Axes';
import QuadrantRings from './QuadrantRings';
import BlipPoints from './BlipPoints';

import './chart.scss';

const RingLabel = ({ring, xScale, yScale}) => {
    const ringRadius = chartConfig.ringsAttributes[ring.position - 1].radius,
      previousRingRadius = ring.position == 1 ? 0 : chartConfig.ringsAttributes[ring.position - 2].radius,

      // middle point in between two ring arcs
      distanceFromCentre = previousRingRadius + (ringRadius - previousRingRadius) / 2;

    return (
        <g className="ring-label">
          {/* Right hand-side label */}
          <text x={xScale(distanceFromCentre)} y={yScale(0)} textAnchor="middle" dy=".35em">
              {ring.displayName}
          </text>
          {/* Left hand-side label */}
          <text x={xScale(-distanceFromCentre)} y={yScale(0)} textAnchor="middle" dy=".35em">
              {ring.displayName}
          </text>
        </g>
    );
};

export default function RadarChart({ blips }) {
  const xScale = d3.scaleLinear()
    .domain(chartConfig.scale)
    .range([0, chartConfig.size]);
  const yScale = d3.scaleLinear()
    .domain(chartConfig.scale)
    .range([chartConfig.size, 0]);

  return (
    <div className="chart" style={{maxWidth: `${chartConfig.size}px`}}>
      <svg viewBox={`0 0 ${chartConfig.size} ${chartConfig.size}`}>
          <g transform={`translate(${xScale(0)}, 0)`}>
            <YAxis scale={yScale}/>
          </g>
          <g transform={`translate(0, ${yScale(0)})`}>
            <XAxis scale={xScale}/>
          </g>

          {Object.keys(quadrantsMap).map((id, index) => (
              <QuadrantRings key={index} quadrant={quadrantsMap[id]} xScale={xScale} />
          ))}

          {Object.keys(ringsMap).map((id, index) => (
              <RingLabel key={index} ring={ringsMap[id]} xScale={xScale} yScale={yScale} />
          ))}

          <BlipPoints blips={blips} xScale={xScale} yScale={yScale}/>
      </svg>
      <ReactTooltip className="tooltip" offset={{top: -5}}/>
    </div>
    );
}