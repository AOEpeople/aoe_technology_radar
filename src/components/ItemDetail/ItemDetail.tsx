import styles from "./ItemDetail.module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { Attention, Edit } from "@/components/Icons";
import { Tag } from "@/components/Tags/Tags";
import { getEditUrl, getLabel, getReleases } from "@/lib/data";
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
        {item.tags?.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <div className={styles.revisions}>
        {notMaintainedText && isNotMaintained(item.release) && (
          <div className={cn(styles.revision, styles.hint)}>
            <span className={styles.release}>
              <Attention className={styles.notMaintainedIcon} />
            </span>
            <div className={styles.content}>{notMaintainedText}</div>
          </div>
        )}
        <Revision
          id={item.id}
          release={item.release}
          ring={item.ring}
          body={item.body}
        />
        {item.revisions?.map((revision, index) => (
          <Revision key={index} id={item.id} {...revision} />
        ))}
      </div>
    </>
  );
}

interface RevisionProps {
  id: string;
  release: string;
  ring: string;
  body?: string;
}

function Revision({ id, release, ring, body }: RevisionProps) {
  const date = new Date(release);
  const editLink = getEditUrl({ id, release });
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
        {editLink && (
          <a href={editLink} target="_blank" className={styles.editLink}>
            <Edit />
          </a>
        )}
      </div>
    </div>
  );
}
