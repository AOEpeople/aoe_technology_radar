import Link from "next/link";
import { CSSProperties, useMemo } from "react";

import styles from "./Label.module.css";

import { SegmentLink } from "@/components/SegmentLink/SegmentLink";
import { getLabel } from "@/lib/data";
import { Segment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LabelProps {
  segment: Segment;
}

export function Label({ segment }: LabelProps) {
  const style = useMemo(
    () => ({ "--segment-color": segment.color }) as CSSProperties,
    [segment.color],
  );

  return (
    <div
      className={cn(styles.label, styles[`position-${segment.position}`])}
      style={style}
    >
      <div className={styles.header}>
        <span>
          {getLabel("segment")} {segment.position}
        </span>
        <SegmentLink segment={segment} />
      </div>
      <h3 className={styles.title}>{segment.title}</h3>
      <p className={styles.description}>{segment.description}</p>
    </div>
  );
}
