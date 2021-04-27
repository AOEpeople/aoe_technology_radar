import React from 'react';
import * as d3 from "d3";
import './chart.scss';
import { blipFlags, chartConfig, quadrantsMap, ringsMap } from '../../config';
import { LeftAxis, BottomAxis } from './Axes';
import QuadrantRings from './QuadrantRings';
import BlipPoints from './BlipPoints';

const RingLabel = ({ring}) => {
    const middlePoint = chartConfig.canvasSize / 2;
    const shift = (ring.position - 1) * chartConfig.canvasSize / 8 + chartConfig.canvasSize / 16;

    return (
        <g>
        {/* Right hand-side label */}
        <text x={middlePoint + shift} y={middlePoint} textAnchor="middle" dy=".35em">
            {ring.displayName}
        </text>
        {/* Left hand-side label */}
        <text x={middlePoint - shift} y={middlePoint} textAnchor="middle" dy=".35em">
            {ring.displayName}
        </text>
        </g>
    );
};

export default function RadarChart({ blips }) {
  const xScale = d3.scaleLinear()
    .domain([-4, 4])
    .range([0, chartConfig.canvasSize]);
  const yScale = d3.scaleLinear()
    .domain([-4, 4])
    .range([chartConfig.canvasSize, 0]);

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${chartConfig.size} ${chartConfig.size}`}>
        <g transform={`translate(${chartConfig.margin}, ${chartConfig.margin})`}>

            <g transform={`translate(${xScale.range()[1] / 2}, 0)`}>
            <LeftAxis scale={yScale}/>
            </g>
            <g transform={`translate(0, ${yScale.range()[0] / 2})`}>
            <BottomAxis scale={xScale}/>
            </g>

            {Object.keys(quadrantsMap).map((id, index) => (
                <QuadrantRings key={index} quadrant={quadrantsMap[id]} />
            ))}

            {Object.keys(ringsMap).map((id, index) => (
                <RingLabel key={index} ring={ringsMap[id]} />
            ))}

            <BlipPoints blips={blips} xScale={xScale} yScale={yScale}/>
        </g>
      </svg>
    </div>
    );
}