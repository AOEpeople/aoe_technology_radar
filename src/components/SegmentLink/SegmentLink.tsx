import Link from "next/link";

import styles from "./SegmentLink.module.css";

import Pie from "@/components/Icons/Pie";
import { getLabel } from "@/lib/data";
import { Segment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SegmentLinkProps {
  segment: Segment;
  label?: string;
  className?: string;
}
export function SegmentLink({
  segment,
  label = getLabel("zoomIn"),
  className,
}: SegmentLinkProps) {
  return (
    <Link className={cn(styles.link, className)} href={`/${segment.id}`}>
      <Pie className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
