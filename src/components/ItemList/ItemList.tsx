import Link from "next/link";

import styles from "./ItemList.module.css";

import { FlagBadge } from "@/components/Badge/Badge";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ItemListProps {
  items: Item[];
  activeId?: string;
  size?: "small" | "default";
  className?: string;
}

export function ItemList({
  items,
  activeId,
  size = "default",
  className,
}: ItemListProps) {
  return (
    <ul
      className={cn(styles.list, className, {
        [styles.isSmall]: size === "small",
      })}
    >
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
            <FlagBadge
              className={styles.flag}
              flag={item.flag}
              short={size == "small"}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
