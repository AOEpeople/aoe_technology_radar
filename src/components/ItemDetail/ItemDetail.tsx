import { useState } from "react";

import styles from "./ItemDetail.module.css";

import { RingBadge } from "@/components/Badge/Badge";
import { Attention, Edit } from "@/components/Icons";
import { Tag } from "@/components/Tags/Tags";
import { getEditUrl, getLabel, getReleases, getToggle } from "@/lib/data";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";

const latestReleases = getReleases().slice(-3);
const showFacts = getToggle("showFacts");

function isNotMaintained(release: string) {
  return !latestReleases.includes(release);
}

interface ItemDetailProps {
  item: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  const [activeTab, setActiveTab] = useState(showFacts ? "facts" : "revisions");
  const notMaintainedText = getLabel("notUpdated");

  return (
    <div className={styles.itemDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{item.title}</h1>
        {item.tags?.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      {showFacts && (
        <div className={styles.tabs}>
          <button
            className={activeTab === "facts" ? styles.active : ""}
            onClick={() => setActiveTab("facts")}
          >
            Facts
          </button>
          <button
            className={activeTab === "revisions" ? styles.active : ""}
            onClick={() => setActiveTab("revisions")}
          >
            Revisions
            {item.revisions && (
              <span className={styles.badge}>{item.revisions.length}</span>
            )}
          </button>
        </div>
      )}
      {activeTab === "revisions" && (
        <div className={styles.revisions}>
          {notMaintainedText && isNotMaintained(item.release) && (
            <div className={cn(styles.revision, styles.hint)}>
              <span className={styles.release}>
                <Attention className={styles.notMaintainedIcon} />
              </span>
              <div className={styles.content}>{notMaintainedText}</div>
            </div>
          )}
          {!showFacts && (
            <Revision
              id={item.id}
              release={item.release}
              ring={item.ring}
              body={item.body}
            />
          )}
          {item.revisions?.map((revision, index) => (
            <Revision key={index} id={item.id} {...revision} />
          ))}
        </div>
      )}
      {activeTab === "facts" && (
        <div className={styles.content + " " + styles.facts}>
          <RingBadge className={styles.ring} ring={item.ring} size="large" />
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </div>
      )}
    </div>
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
