import Link from "next/link";
import React, { FC, Fragment, memo } from "react";

import styles from "./Chart.module.css";

import { Blip } from "@/components/Radar/Blip";
import { Item, Quadrant, Ring } from "@/lib/types";

export interface ChartProps {
  size?: number;
  quadrants: Quadrant[];
  rings: Ring[];
  items: Item[];
  className?: string;
}

const _Chart: FC<ChartProps> = ({
  size = 800,
  quadrants = [],
  rings = [],
  items = [],
  className,
}) => {
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
      x: Math.round(center + radius * Math.cos(angleInRadians)),
      y: Math.round(center + radius * Math.sin(angleInRadians)),
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

  // Function to place items inside their rings and quadrants
  const renderItem = (item: Item) => {
    const ring = rings.find((r) => r.id === item.ring);
    const quadrant = quadrants.find((q) => q.id === item.quadrant);
    if (!ring || !quadrant) return null; // If no ring or quadrant, don't render item
    const [x, y] = item.position;

    return (
      <Link
        key={item.id}
        href={`/${item.quadrant}/${item.id}`}
        data-tooltip={item.title}
        data-tooltip-color={quadrant.color}
        tabIndex={-1}
      >
        <Blip flag={item.flag} color={quadrant.color} x={x} y={y} />
      </Link>
    );
  };

  const renderRingLabels = () => {
    return rings.map((ring, index) => {
      const outerRadius = ring.radius || 1;
      const innerRadius = rings[index - 1]?.radius || 0;
      const position = ((outerRadius + innerRadius) / 2) * center;

      return (
        <Fragment key={ring.id}>
          <text
            x={center + position}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
          >
            {ring.title}
          </text>
          <text
            x={center - position}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
          >
            {ring.title}
          </text>
        </Fragment>
      );
    });
  };

  return (
    <svg
      className={className}
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    >
      {quadrants.map((quadrant) => (
        <g key={quadrant.id} data-quadrant={quadrant.id}>
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
      <g className={styles.items}>{items.map((item) => renderItem(item))}</g>
      <g className={styles.ringLabels}>{renderRingLabels()}</g>
    </svg>
  );
};

export const Chart = memo(_Chart);
