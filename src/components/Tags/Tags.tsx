import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

import styles from "./Tags.module.css";

import IconRemove from "@/components/Icons/Close";
import IconTag from "@/components/Icons/Tag";
import { getLabel } from "@/lib/data";
import { cn } from "@/lib/utils";

type TagProps = {
  tag: string;
  isActive?: boolean;
  activeTags?: string[];
} & Omit<LinkProps, "href"> &
  ComponentPropsWithoutRef<"a">;

export function Tag({
  tag,
  isActive,
  activeTags = [],
  className,
  ...props
}: TagProps) {
  const Icon = isActive ? IconRemove : IconTag;

  // Update URL based on tag state
  const remainingTags = isActive
    ? activeTags.filter((t) => t !== tag)
    : [...activeTags, tag];

  const searchParams = new URLSearchParams(
    remainingTags.map((tag) => ["tag", encodeURIComponent(tag)]),
  );
  const href = searchParams.toString() ? `/?${searchParams}` : "/";

  return (
    <Link
      {...props}
      className={cn(styles.tag, className, isActive && styles.active)}
      href={href}
    >
      <Icon className={cn(styles.icon)} />
      <span className={styles.label}>{tag}</span>
    </Link>
  );
}

interface TagsProps {
  tags: string[];
  activeTags: string[];
  className?: string;
}

export function Tags({ tags, activeTags, className }: TagsProps) {
  const label = getLabel("filterByTag");
  return (
    <div className={cn(styles.tags, className)}>
      {!!label && <h3>{label}</h3>}
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          isActive={activeTags.includes(tag)}
          activeTags={activeTags}
          scroll={false}
        />
      ))}
    </div>
  );
}
