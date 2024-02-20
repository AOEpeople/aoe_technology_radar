import React, { FC } from "react";

import styles from "./Radar.module.css";

import { Quadrant, Ring } from "@/lib/types";

export interface RadarProps {
  size?: number;
  quadrants: Quadrant[];
  rings: Ring[];
}

export const Radar: FC<RadarProps> = ({ size = 800, quadrants, rings }) => {
  const viewBoxSize = size;
  const center = size / 2;
  const startAngles = [270, 0, 180, 90]; // Corresponding to positions 1, 2, 3, and 4 respectively

  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (
    radius: number,
    angleInDegrees: number,
  ): { x: number; y: number } => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };

  // Function to generate the path for a ring segment
  const describeArc = (radiusPercentage: number, position: number): string => {
    // Define the start and end angles based on the quadrant position
    const startAngle = startAngles[position - 1];
    const endAngle = startAngle + 90;

    const radius = radiusPercentage * center; // Convert percentage to actual radius
    const start = polarToCartesian(radius, endAngle);
    const end = polarToCartesian(radius, startAngle);

    // prettier-ignore
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, 0, 0, end.x, end.y,
    ].join(" ");
  };

  const renderGlow = (position: number, color: string) => {
    const gradientId = `glow-${position}`;

    const cx = position === 1 || position === 3 ? 1 : 0;
    const cy = position === 1 || position === 2 ? 1 : 0;

    const x = position === 1 || position === 3 ? 0 : center;
    const y = position === 1 || position === 2 ? 0 : center;
    return (
      <>
        <defs>
          <radialGradient id={gradientId} x={0} y={0} r={1} cx={cx} cy={cy}>
            <stop offset="0%" stopColor={color} stopOpacity={0.5}></stop>
            <stop offset="100%" stopColor={color} stopOpacity={0}></stop>
          </radialGradient>
        </defs>
        <rect
          width={center}
          height={center}
          x={x}
          y={y}
          fill={`url(#${gradientId})`}
        />
      </>
    );
  };

  return (
    <div className={styles.radar}>
      <svg
        className={styles.svg}
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        {quadrants.map((quadrant) => (
          <g className={`quadrant quadrant-${quadrant.id}`} key={quadrant.id}>
            {renderGlow(quadrant.position, quadrant.color)}
            {rings.map((ring) => (
              <path
                key={`${ring.id}-${quadrant.id}`}
                data-key={`${ring.id}-${quadrant.id}`}
                d={describeArc(ring.radius || 0.5, quadrant.position)}
                fill="none"
                stroke={quadrant.color}
                strokeWidth={ring.strokeWidth || 2}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Radar;
