import React from 'react';
import * as d3 from 'd3';
import { chartConfig } from '../../config';

const arcPath = (quadrantPosition, ringPosition, xScale) => {
  const startAngle = (quadrantPosition - 1) * Math.PI / 2,
      endAngle = quadrantPosition *  Math.PI / 2,
      arcAttrs =  chartConfig.ringsAttributes[ringPosition - 1],
      ringRadiusPx = xScale(arcAttrs.radius) - xScale(0),
      arc = d3.arc();

  return arc({
    innerRadius: ringRadiusPx - arcAttrs.arcWidth,
    outerRadius: ringRadiusPx,
    startAngle,
    endAngle
    });
}

export default function QuadrantRings ({ quadrant, xScale}) {
    // order from top-right clockwise
    const gradientAttributes = [
      {x: xScale(0), y: 0,          cx: 0, cy: 1, r: 1},
      {x: xScale(0), y: xScale(0),  cx: 0, cy: 0, r: 1},
      {x: 0,         y: xScale(0),  cx: 1, cy: 0, r: 1},
      {x: 0,         y: 0,          cx: 1, cy: 1, r: 1}
    ];
    const gradientId = `${quadrant.position}-radial-gradient`,
        quadrantSize = chartConfig.size / 2;

    return (
      <g className="quadrant-ring">
        {/* Definition of the quadrant gradient */}
        <defs>
          <radialGradient id={gradientId} {...gradientAttributes[quadrant.position - 1]}>
            <stop offset="0%" stopColor={quadrant.colour}></stop>
            <stop offset="100%" stopColor={quadrant.colour} stopOpacity="0"></stop>
          </radialGradient>         
        </defs>

        {/* Gradient background area */}
        <rect
          width={quadrantSize}
          height={quadrantSize}
          x={gradientAttributes[quadrant.position - 1].x}
          y={gradientAttributes[quadrant.position - 1].y}
          fill={`url(#${gradientId})`}
          style={{opacity: 0.5}}
        />

        {/* Rings' arcs */}
        {[1, 2, 3, 4].map((ringPosition, index) => (
          <path
            key={index}
            fill={quadrant.colour}
            d={arcPath(quadrant.position, ringPosition, xScale)}
            style={{transform: `translate(${quadrantSize}px, ${quadrantSize}px)`}}
          />
        ))}

      </g>
    );
  }