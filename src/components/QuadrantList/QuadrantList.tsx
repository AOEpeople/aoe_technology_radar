import Link from "next/link";

import styles from "./QuadrantList.module.css";

import { QuadrantLink } from "@/components/QuadrantLink/QuadrantLink";
import { RingList } from "@/components/RingList/RingList";
import { getQuadrant, groupItemsByQuadrant } from "@/lib/data";
import { Item } from "@/lib/types";

interface RingListProps {
  items: Item[];
}

export function QuadrantList({ items }: RingListProps) {
  const quadrants = groupItemsByQuadrant(items);
  return (
    <ul className={styles.quadrants}>
      {Object.entries(quadrants).map(([quadrantId, items]) => {
        const quadrant = getQuadrant(quadrantId);
        if (!quadrant) return null;
        return (
          <li key={quadrantId} className={styles.quadrant}>
            <div className={styles.header}>
              <h3 className={styles.title}>
                <Link href={`/${quadrant.id}`}>{quadrant.title}</Link>
              </h3>
              <QuadrantLink quadrant={quadrant} />
            </div>
            <RingList items={items} size="small" />
          </li>
        );
      })}
    </ul>
  );
}
