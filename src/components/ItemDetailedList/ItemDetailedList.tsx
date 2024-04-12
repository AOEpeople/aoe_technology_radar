import Link from "next/link";

import styles from "./ItemDetailedList.module.css";

import { FlagBadge, RingBadge } from "@/components/Badge/Badge";
import { getQuadrant } from "@/lib/data";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ItemListProps {
  items: Item[];
  activeId?: string;
  size?: "small" | "default" | "large";
  hideRing?: boolean;
  className?: string;
}

export function ItemDetailedList({
  items,
  activeId,
  size = "default",
  hideRing = false,
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
            <span className={styles.title}>
              {item.blipId}. {item.title}
            </span>
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
                {!hideRing && (
                  <RingBadge
                    className={styles.ring}
                    ring={item.ring}
                    size="small"
                  />
                )}
              </div>
            )}
          </Link>
          <div className={styles.content}>
            <RingBadge className={styles.ring} ring={item.ring} size="medium" />
            {item.body ? (
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
