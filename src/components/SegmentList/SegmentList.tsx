import Link from "next/link";

import styles from "./SegmentList.module.css";

import { RingList } from "@/components/RingList/RingList";
import { SegmentLink } from "@/components/SegmentLink/SegmentLink";
import { getSegment, groupItemsBySegment } from "@/lib/data";
import { Item } from "@/lib/types";

interface RingListProps {
  items: Item[];
}

export function SegmentList({ items }: RingListProps) {
  const segments = groupItemsBySegment(items);
  return (
    <ul className={styles.segments}>
      {Object.entries(segments).map(([segmentId, items]) => {
        const segment = getSegment(segmentId);
        if (!segment) return null;
        return (
          <li key={segmentId} className={styles.segment}>
            <div className={styles.header}>
              <h3 className={styles.title}>
                <Link href={`/${segment.id}`}>{segment.title}</Link>
              </h3>
              <SegmentLink segment={segment} />
            </div>
            <RingList items={items} size="small" />
          </li>
        );
      })}
    </ul>
  );
}
