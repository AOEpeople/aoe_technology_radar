import styles from "./RingList.module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { ItemList, ItemListProps } from "@/components/ItemList/ItemList";
import { groupItemsByRing } from "@/lib/data";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RingListProps {
  items: Item[];
  size?: ItemListProps["size"];
}
export function RingList({ items, size }: RingListProps) {
  const rings = groupItemsByRing(items);
  return (
    <ul className={cn(styles.rings, { [styles.isSmall]: size == "small" })}>
      {Object.entries(rings).map(([ring, items]) => {
        return (
          <li key={ring} className={styles.ring}>
            <RingBadge className={styles.badge} ring={ring} />
            <ItemList className={styles.list} items={items} size={size} />
          </li>
        );
      })}
    </ul>
  );
}
