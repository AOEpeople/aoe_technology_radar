import React from 'react';
import * as d3 from "d3";
import ReactTooltip from 'react-tooltip';
import { Item, Ring } from '../../model';
import { chartConfig, quadrantsMap } from '../../config';
import { YAxis, XAxis } from './Axes';
import QuadrantRings from './QuadrantRings';
import BlipPoints from './BlipPoints';

import './chart.scss';

const RingLabel: React.FC<{
  ring: Ring
  xScale: d3.ScaleLinear
  yScale: d3.ScaleLinear
}> = ({ring, xScale, yScale}) => {
    const ringRadius = chartConfig.ringsAttributes[ring - 1].radius,
      previousRingRadius = ring == 1 ? 0 : chartConfig.ringsAttributes[ring - 2].radius,

      // middle point in between two ring arcs
      distanceFromCentre = previousRingRadius + (ringRadius - previousRingRadius) / 2;

    return (
        <g className="ring-label">
          {/* Right hand-side label */}
          <text x={xScale(distanceFromCentre)} y={yScale(0)} textAnchor="middle" dy=".35em">
              {Ring[ring]}
          </text>
          {/* Left hand-side label */}
          <text x={xScale(-distanceFromCentre)} y={yScale(0)} textAnchor="middle" dy=".35em">
              {Ring[ring]}
          </text>
        </g>
    );
};

const RadarChart: React.FC<{
  items: Item[]
}> = ({ items }) => {

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

          {[...quadrantsMap.values()].map((value, index) => (
              <QuadrantRings key={index} quadrant={value} xScale={xScale} />
          ))}

          {[Ring.adopt, Ring.trial, Ring.assess, Ring.hold].map((ring, index) => (
              <RingLabel key={index} ring={ring} xScale={xScale} yScale={yScale} />
          ))}

          <BlipPoints items={items} xScale={xScale} yScale={yScale}/>
      </svg>
      <ReactTooltip className="tooltip" offset={{top: -5}}/>
    </div>
    );
}

export default RadarChart;