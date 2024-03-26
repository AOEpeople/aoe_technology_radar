"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Logo.module.css";

import { getAppName, getLogoUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Logo() {
  const pathname = usePathname();
  const appName = getAppName();
  const logoUrl = getLogoUrl();

  return (
    <Link href="/" className={cn(styles.logo, pathname != "/" && styles.small)}>
      <img src={logoUrl} className={cn(styles.src)} alt={appName} />
      <span className={styles.subline}>{appName}</span>
    </Link>
  );
}
