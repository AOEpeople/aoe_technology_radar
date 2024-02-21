import Link from "next/link";
import { CSSProperties, useMemo } from "react";

import styles from "./Label.module.css";

import Pie from "@/components/Icons/Pie";
import { Quadrant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LabelProps {
  quadrant: Quadrant;
}

export function Label({ quadrant }: LabelProps) {
  const style = useMemo(
    () => ({ "--quadrant-color": quadrant.color }) as CSSProperties,
    [quadrant.color],
  );

  return (
    <div
      className={cn(styles.label, styles[`position-${quadrant.position}`])}
      style={style}
    >
      <div className={styles.header}>
        <span>Quadrant {quadrant.position}</span>
        <Link href={`/${quadrant.id}`}>
          <Pie className={styles.icon} />
          <span>Zoom in</span>
        </Link>
      </div>
      <h3 className={styles.title}>{quadrant.title}</h3>
      <p className={styles.description}>{quadrant.description}</p>
    </div>
  );
}
