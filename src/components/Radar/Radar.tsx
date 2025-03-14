import React, {
  CSSProperties,
  FC,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Radar.module.css";

import { Chart } from "@/components/Radar/Chart";
import { Label } from "@/components/Radar/Label";
import { Legend } from "@/components/Radar/Legend";
import { Item, Ring, Segment } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface RadarProps {
  size?: number;
  segments: Segment[];
  rings: Ring[];
  items: Item[];
}

export const Radar: FC<RadarProps> = ({
  size = 800,
  segments = [],
  rings = [],
  items = [],
}) => {
  const radarRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    color: "",
    x: 0,
    y: 0,
  });

  const tooltipStyle = useMemo(
    () =>
      ({
        left: tooltip.x,
        top: tooltip.y,
        ...(tooltip.color ? { "--tooltip": tooltip.color } : undefined),
      }) as CSSProperties,
    [tooltip],
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const link =
      e.target instanceof Element && e.target.closest("a[data-tooltip]");
    if (link) {
      const text = link.getAttribute("data-tooltip") || "";
      const color = link.getAttribute("data-tooltip-color") || "";
      const linkRect = link.getBoundingClientRect();
      const radarRect = radarRef.current!.getBoundingClientRect();

      // Adjusting tooltip position to be relative to the radar container
      const x = linkRect.left - radarRect.left + linkRect.width / 2;
      const y = linkRect.top - radarRect.top;

      setTooltip({
        text,
        color,
        show: !!text,
        x,
        y,
      });
    } else {
      if (tooltip.show) {
        setTooltip({ ...tooltip, show: false });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, show: false });
  };

  return (
    <div
      ref={radarRef}
      className={styles.radar}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Chart
        className={styles.chart}
        size={size}
        segments={segments}
        rings={rings}
        items={items}
      />
      <div className={styles.labels}>
        {segments.map((segment) => (
          <Label key={segment.id} segment={segment} />
        ))}
      </div>
      <Legend />
      <span
        className={cn(styles.tooltip, tooltip.show && styles.isShown)}
        style={tooltipStyle}
      >
        {tooltip.text}
      </span>
    </div>
  );
};

export default Radar;
