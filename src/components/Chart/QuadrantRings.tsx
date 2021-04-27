import React from 'react';
import * as d3 from 'd3';
import { chartConfig } from '../../config';

const size = chartConfig.canvasSize / 2;

const arcPath = (quadrantPosition, ringPosition) => {
  // order from the centre outwards
  const arcAttributes = [
    {radius: size / 4,        width: 6},
    {radius: size / 2,        width: 4},
    {radius: (size / 4 * 3),  width: 2},
    {radius: size,            width: 2}
  ]
  const startAngle = quadrantPosition == 1 ?
      3 * Math.PI / 2
      : (quadrantPosition - 2) *  Math.PI / 2
  const endAngle = quadrantPosition == 1 ?
      4 * Math.PI / 2
      : (quadrantPosition -1) *  Math.PI / 2
  const arcAttrs =  arcAttributes[ringPosition - 1];

  const arc = d3.arc();
  return arc({
    innerRadius: arcAttrs.radius + (arcAttrs.width / 2),
    outerRadius: arcAttrs.radius - (arcAttrs.width / 2),
    startAngle,
    endAngle
    });
}

export default function QuadrantRings ({ quadrant }) {
    // order from top left clockwise
    const gradientAttributes = [
      {x: 0,    y: 0,     cx: 1, cy: 1, r: 1},
      {x: size, y: 0,     cx: 0, cy: 1, r: 1},
      {x: size, y: size,  cx: 0, cy: 0, r: 1},
      {x: 0,    y: size,  cx: 1, cy: 0, r: 1}
    ];
    const gradientId = `${quadrant.position}-radial-gradient`;

    return (
      <g>
        {/* Definition of the quadrant gradient */}
        <defs>
          <radialGradient id={gradientId} {...gradientAttributes[quadrant.position - 1]}>
            <stop offset="0%" stopColor={quadrant.colour}></stop>
            <stop offset="100%" stopColor={quadrant.colour} stopOpacity="0"></stop>
          </radialGradient>         
        </defs>

        {/* Gradient background area */}
        <rect
          width={size}
          height={size}
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
            d={arcPath(quadrant.position, ringPosition)}
            style={{transform: `translate(${size}px, ${size}px)`}}
          />
        ))}

      </g>
    );
  }