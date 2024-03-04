import styles from "./ItemDetail.module.css";

import { RingBadge } from "@/components/Badge/Badge";
import Attention from "@/components/Icons/Attention";
import { Tag } from "@/components/Tags/Tags";
import { getLabel, getReleases } from "@/lib/data";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

const latestReleases = getReleases().slice(-3);

function isNotMaintained(release: string) {
  return !latestReleases.includes(release);
}

interface ItemProps {
  item: Item;
}

export function ItemDetail({ item }: ItemProps) {
  const notMaintainedText = getLabel("notUpdated");
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{item.title}</h1>
        {item.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className={styles.revisions}>
        {notMaintainedText && isNotMaintained(item.release) && (
          <div className={cn(styles.revision, styles.hint)}>
            <span className={styles.release}>
              <Attention className={styles.icon} />
            </span>
            <div className={styles.content}>{notMaintainedText}</div>
          </div>
        )}
        <Revision release={item.release} ring={item.ring} body={item.body} />
        {item.revisions?.map((revision, index) => (
          <Revision key={index} {...revision} />
        ))}
      </div>
    </>
  );
}

interface RevisionProps {
  release: string;
  ring: string;
  body?: string;
}

function Revision({ release, ring, body }: RevisionProps) {
  const date = new Date(release);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className={cn(styles.revision, !body && styles.noContent)}>
      <time dateTime={release} className={styles.release}>
        {formattedDate}
      </time>
      <div className={styles.content}>
        <RingBadge className={styles.ring} ring={ring} size="large" />
        {body ? <div dangerouslySetInnerHTML={{ __html: body }} /> : null}
      </div>
    </div>
  );
}
