import React, { FC } from "react";

import { Blip } from "../Radar/Blip";

import { getChartConfig } from "@/lib/data";
import { Flag, Item, Ring, Segment } from "@/lib/types";

interface BackgroundImageProps {
  size?: number;
  segments: Segment[];
  rings: Ring[];
  items: Item[];
  className?: string;
}

const { blipSize } = getChartConfig();
const halfBlipSize = blipSize / 2;

export const BackgroundImage: FC<BackgroundImageProps> = ({
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

  function getRelativeItemPosition(itemPosition: number[]): number[] {
    const ratio = size / getChartConfig().size;
    return [itemPosition[0] * ratio, itemPosition[1] * ratio];
  }

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

    // If there's only one segment, draw a full circle
    // prettier-ignore
    if (numSegments === 1) {
      return [
        "M", center, center - radius,
        "A", radius, radius, 0, 1, 0, center, center + radius,
        "A", radius, radius, 0, 1, 0, center, center - radius,
      ].join(" ");
    }

    // prettier-ignore
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, 0, 0, end.x, end.y,
    ].join(" ");
  };

  const renderGlow = (position: number, color: string, numSegments: number) => {
    const angleIncrement = 360 / numSegments;
    const startAngle = (position - 1) * angleIncrement;
    const endAngle = startAngle + angleIncrement;

    const cx = (startAngle + endAngle) / 2 > 180 ? 1 : 0;
    const cy =
      (startAngle + endAngle) / 2 > 90 && (startAngle + endAngle) / 2 < 270
        ? 1
        : 0;

    if (numSegments == 1)
      return (
        <circle
          cx={center}
          cy={center}
          r={center}
          fill={color}
          mask="url(#glow-mask)"
        />
      );

    if (numSegments == 2) {
      return (
        <rect
          x={position === 1 ? center : 0}
          y={0}
          width={center}
          height={size}
          fill={color}
          mask="url(#glow-mask)"
        />
      );
    }

    return (
      <polygon
        points={`${center},${center} ${polarToCartesian(size, startAngle).x},${polarToCartesian(size, startAngle).y} ${polarToCartesian(size, endAngle).x},${polarToCartesian(size, endAngle).y}`}
        fill={color}
        mask="url(#glow-mask)"
      />
    );
  };

  // Function to place items inside their rings and segments
  const renderItem = (item: Item) => {
    const ring = rings.find((r) => r.id === item.ring);
    const segment = segments.find((q) => q.id === item.segment);
    if (!ring || !segment) return null; // If no ring or segment, don't render item
    const [x, y] = getRelativeItemPosition(item.position);

    switch (item.flag) {
      case Flag.New:
        return (
          <path
            stroke="none"
            fill={segment.color}
            d="M5.7679491924311 2.1387840678323a2 2 0 0 1 3.4641016151378 0l5.0358983848622 8.7224318643355a2 2 0 0 1 -1.7320508075689 3l-10.071796769724 0a2 2 0 0 1 -1.7320508075689 -3"
            transform={`translate(${Math.round(x - halfBlipSize)},${Math.round(y - halfBlipSize)})`}
          />
        );
      case Flag.Changed:
        return (
          <rect
            transform={`rotate(-45 ${Math.round(x - halfBlipSize)} ${Math.round(y - halfBlipSize)})`}
            x={x}
            y={y}
            width={blipSize}
            height={blipSize}
            rx="3"
            stroke="none"
            fill={segment.color}
          />
        );
      default:
        return (
          <circle
            cx={x}
            cy={y}
            r={halfBlipSize}
            stroke="none"
            fill={segment.color}
          />
        );
    }
    // return <Blip color={segment.color} x={x} y={y} flag={item.flag} />;
  };

  return (
    <svg
      className={className}
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      style={{
        maskImage:
          " linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      <defs>
        <mask id="radar-mask">
          <rect width="100%" height="100%" fill="black" />
          <circle cx={center} cy={center} r={center} fill="white" />
        </mask>
        <mask id="glow-mask">
          <radialGradient id="glow-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <circle
            cx={center}
            cy={center}
            r={center}
            fill="url(#glow-gradient)"
          />
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
      <g data-key="items">{items.map((item) => renderItem(item))}</g>
    </svg>
  );
};
