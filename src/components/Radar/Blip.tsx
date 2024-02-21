import React from "react";

import { getChartConfig } from "@/lib/data";
import { Flag } from "@/lib/types";

const { blipSize } = getChartConfig();
const halfBlipSize = blipSize / 2;

interface BlipProps {
  color: string;
  x: number;
  y: number;
}

export function Blip({ flag, color, x, y }: BlipProps & { flag: Flag }) {
  switch (flag) {
    case Flag.New:
      return <BlipNew x={x} y={y} color={color} />;
    case Flag.Changed:
      return <BlipChanged x={x} y={y} color={color} />;
    default:
      return <BlipDefault x={x} y={y} color={color} />;
  }
}

function BlipNew({ x, y, color }: BlipProps) {
  x = Math.round(x - halfBlipSize);
  y = Math.round(y - halfBlipSize);
  return (
    <path
      stroke="none"
      fill={color}
      d="M5.7679491924311 2.1387840678323a2 2 0 0 1 3.4641016151378 0l5.0358983848622 8.7224318643355a2 2 0 0 1 -1.7320508075689 3l-10.071796769724 0a2 2 0 0 1 -1.7320508075689 -3"
      transform={`translate(${x},${y})`}
    />
  );
}

function BlipChanged({ x, y, color }: BlipProps) {
  x = Math.round(x - halfBlipSize);
  y = Math.round(y - halfBlipSize);
  return (
    <rect
      transform={`rotate(-45 ${x} ${y})`}
      x={x}
      y={y}
      width={blipSize}
      height={blipSize}
      rx="3"
      stroke="none"
      fill={color}
    />
  );
}

function BlipDefault({ x, y, color }: BlipProps) {
  return <circle cx={x} cy={y} r={halfBlipSize} stroke="none" fill={color} />;
}
