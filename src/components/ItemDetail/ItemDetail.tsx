import styles from "./ItemDetail.module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ItemProps {
  item: Item;
}

export function ItemDetail({ item }: ItemProps) {
  return (
    <>
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.revisions}>
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
