import Link from "next/link";

import styles from "./ItemList.module.css";

import { FlagBadge, RingBadge } from "@/components/Badge/Badge";
import { getQuadrant } from "@/lib/data";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ItemListProps {
  items: Item[];
  activeId?: string;
  size?: "small" | "default" | "large";
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
        [styles.isLarge]: size === "large",
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

            {size === "large" && (
              <div className={styles.info}>
                <span className={styles.quadrant}>
                  {getQuadrant(item.quadrant)?.title}
                </span>
                <RingBadge
                  className={styles.ring}
                  ring={item.ring}
                  size="small"
                />
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
