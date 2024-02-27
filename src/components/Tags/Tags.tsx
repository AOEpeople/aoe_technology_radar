import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

import styles from "./Tags.module.css";

import IconRemove from "@/components/Icons/Close";
import IconTag from "@/components/Icons/Tag";
import { cn } from "@/lib/utils";

type TagProps = {
  tag: string;
  isActive?: boolean;
} & Omit<LinkProps, "href"> &
  ComponentPropsWithoutRef<"a">;

export function Tag({ tag, isActive, className, ...props }: TagProps) {
  const Icon = isActive ? IconRemove : IconTag;
  return (
    <Link
      {...props}
      className={cn(styles.tag, className, isActive && styles.active)}
      href={isActive ? "/" : `/?tag=${tag}`}
    >
      <Icon className={cn(styles.icon)} />
      <span className={styles.label}>{tag}</span>
    </Link>
  );
}

interface TagsProps {
  tags: string[];
  activeTag?: string;
  className?: string;
}

export function Tags({ tags, activeTag, className }: TagsProps) {
  return (
    <div className={cn(styles.tags, className)}>
      <h3>Filter by Tag</h3>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} isActive={activeTag == tag} scroll={false} />
      ))}
    </div>
  );
}
