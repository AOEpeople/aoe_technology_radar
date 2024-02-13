"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../public/logo.svg";
import styles from "./Logo.module.css";

import { getAppName } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Logo() {
  const pathname = usePathname();
  const appName = getAppName();
  return (
    <Link href="/" className={cn(styles.logo, pathname != "/" && styles.small)}>
      <img src={logo.src} className={cn(styles.src)} alt={appName} />
      <span className={styles.subline}>{appName}</span>
    </Link>
  );
}
