import Link from "next/link";

import styles from "./QuadrantLink.module.css";

import Pie from "@/components/Icons/Pie";
import { Quadrant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuadrantLinkProps {
  quadrant: Quadrant;
  label?: string;
  className?: string;
}
export function QuadrantLink({
  quadrant,
  label = "Zoom in",
  className,
}: QuadrantLinkProps) {
  return (
    <Link className={cn(styles.link, className)} href={`/${quadrant.id}`}>
      <Pie className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
