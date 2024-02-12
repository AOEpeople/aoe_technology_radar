import Link from "next/link";

import styles from "./Navigation.module.css";

import { getAppName } from "@/lib/config";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/help-and-about-tech-radar">
            How to use {getAppName()}?
          </Link>
        </li>
        <li className={styles.item}>Filter</li>
        <li className={styles.item}>
          <Link href="/overview">Technologies Overview</Link>
        </li>
        <li className={styles.item}>Search</li>
      </ul>
    </nav>
  );
}
