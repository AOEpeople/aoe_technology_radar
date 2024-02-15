import Link from "next/link";

import styles from "./ItemList.module.css";

import { FlagBadge } from "@/components/Badge/Badge";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ItemListProps {
  items: Item[];
  activeId?: string;
}

export function ItemList({ items, activeId }: ItemListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li className={styles.item} key={item.id}>
          <Link
            className={cn(styles.link, {
              [styles.isFadedOut]: !item.featured,
              [styles.isActive]: item.id === activeId,
            })}
            href={`/${item.quadrant}/${item.id}`}
          >
            {item.title}
            <FlagBadge className={styles.flag} flag={item.flag} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
