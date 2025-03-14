import Link from "next/link";
import React, { FC, Fragment, memo } from "react";

import styles from "./Chart.module.css";

import { Blip } from "@/components/Radar/Blip";
import { Item, Ring, Segment } from "@/lib/types";

export interface ChartProps {
  size?: number;
  segments: Segment[];
  rings: Ring[];
  items: Item[];
  className?: string;
}

const _Chart: FC<ChartProps> = ({
  size = 800,
  segments = [],
  rings = [],
  items = [],
  className,
}) => {
  const viewBoxSize = size;
  const center = size / 2;

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
  const describeArc = (
    radiusPercentage: number,
    position: number,
    numSegments: number,
  ): string => {
    // Calculate the start and end angles based on the number of segments
    const angleIncrement = 360 / numSegments;
    const startAngle = (position - 1) * angleIncrement;
    const endAngle = startAngle + angleIncrement;

    const radius = radiusPercentage * center; // Convert percentage to actual radius
    const start = polarToCartesian(radius, endAngle);
    const end = polarToCartesian(radius, startAngle);

    // prettier-ignore
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, 0, 0, end.x, end.y,
    ].join(" ");
  };

  const renderGlow = (position: number, color: string, numSegments: number) => {
    const gradientId = `glow-${position}`;

    const angleIncrement = 360 / numSegments;
    const startAngle = (position - 1) * angleIncrement;
    const endAngle = startAngle + angleIncrement;

    const cx = (startAngle + endAngle) / 2 > 180 ? 1 : 0;
    const cy =
      (startAngle + endAngle) / 2 > 90 && (startAngle + endAngle) / 2 < 270
        ? 1
        : 0;

    const x = cx === 1 ? 0 : center;
    const y = cy === 1 ? 0 : center;

    return (
      <>
        <defs>
          <radialGradient id={gradientId} x={0} y={0} r={1} cx={cx} cy={cy}>
            <stop offset="0%" stopColor={color} stopOpacity={0.5}></stop>
            <stop offset="100%" stopColor={color} stopOpacity={0}></stop>
          </radialGradient>
        </defs>
        <polygon
          points={`${center},${center} ${polarToCartesian(size, startAngle).x},${polarToCartesian(size, startAngle).y} ${polarToCartesian(size, endAngle).x},${polarToCartesian(size, endAngle).y}`}
          fill={`url(#${gradientId})`}
        />
      </>
    );
  };

  // Function to place items inside their rings and segments
  const renderItem = (item: Item) => {
    const ring = rings.find((r) => r.id === item.ring);
    const segment = segments.find((q) => q.id === item.segment);
    if (!ring || !segment) return null; // If no ring or segment, don't render item
    const [x, y] = item.position;

    return (
      <Link
        key={item.id}
        href={`/${item.segment}/${item.id}`}
        data-tooltip={item.title}
        data-tooltip-color={segment.color}
        tabIndex={-1}
      >
        <Blip flag={item.flag} color={segment.color} x={x} y={y} />
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
      <defs>
        <mask id="radar-mask">
          <rect width="100%" height="100%" fill="black" />
          <circle cx={center} cy={center} r={center} fill="white" />
        </mask>
      </defs>
      {segments.map((segment) => (
        <g key={segment.id} data-segment={segment.id} mask="url(#radar-mask)">
          {renderGlow(segment.position, segment.color, segments.length)}
          {rings.map((ring) => (
            <path
              key={`${ring.id}-${segment.id}`}
              data-key={`${ring.id}-${segment.id}`}
              d={describeArc(
                ring.radius || 0.5,
                segment.position,
                segments.length,
              )}
              fill="none"
              stroke={segment.color}
              strokeWidth={ring.strokeWidth || 2}
            />
          ))}
        </g>
      ))}
      <g className={styles.items} data-key="items">
        {items.map((item) => renderItem(item))}
      </g>
      <g className={styles.ringLabels} data-key="labels">
        {renderRingLabels()}
      </g>
    </svg>
  );
};

export const Chart = memo(_Chart);
