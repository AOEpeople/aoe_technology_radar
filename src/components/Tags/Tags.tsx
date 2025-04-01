import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ComponentPropsWithoutRef } from "react";

import styles from "./Tags.module.css";

import IconRemove from "@/components/Icons/Close";
import IconTag from "@/components/Icons/Tag";
import { getLabel } from "@/lib/data";
import { cn } from "@/lib/utils";

type TagProps = {
  tag: string;
  isActive?: boolean;
} & Omit<LinkProps, "href"> &
  ComponentPropsWithoutRef<"a">;

function QueryString(tag: string, isActive: boolean | undefined) {
  const router = useRouter();

  // Convert router.query dict to URLSearchParams.
  const queryParams = new URLSearchParams();
  for (const key in router.query) {
    const value = router.query[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.append(key, router.query[key] as string);
    }
  }

  // Convert tag query parameter to tag[].
  if (queryParams.has("tag")) {
    queryParams.append("tag[]", queryParams.get("tag") as string);
    queryParams.delete("tag");
  }

  // Update the tag query parameter.
  // If tag is active, remove it from the query string.
  if (isActive) {
    queryParams.delete("tag[]", tag);
  } else {
    queryParams.append("tag[]", tag);
  }

  // Convert URLSearchParams to query string.
  // Replace %5B%5D= with []= to be more readable.
  const queryString = queryParams.toString().replaceAll("%5B%5D=", "[]=");

  // Return the query string.
  return queryString.length ? `/?${queryString}` : "/";
}

export function Tag({ tag, isActive, className, ...props }: TagProps) {
  const Icon = isActive ? IconRemove : IconTag;
  return (
    <Link
      {...props}
      className={cn(styles.tag, className, isActive && styles.active)}
      href={QueryString(tag, isActive)}
    >
      <Icon className={cn(styles.icon)} />
      <span className={styles.label}>{tag}</span>
    </Link>
  );
}

interface TagsProps {
  tags: string[];
  activeTags?: string[];
  className?: string;
}

export function Tags({ tags, activeTags, className }: TagsProps) {
  const label = getLabel("filterByTag");
  const activeTagsList = activeTags || [];
  return (
    <div className={cn(styles.tags, className)}>
      {!!label && <h3>{label}</h3>}
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          isActive={activeTagsList.includes(tag)}
          scroll={false}
        />
      ))}
    </div>
  );
}
