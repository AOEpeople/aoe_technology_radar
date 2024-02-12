import Link from "next/link";

import styles from "./Navigation.module.css";

import IconFilter from "@/components/Icons/Filter";
import IconOverview from "@/components/Icons/Overview";
import IconQuestion from "@/components/Icons/Question";
import IconSearch from "@/components/Icons/Search";
import { getAppName } from "@/lib/config";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/help-and-about-tech-radar">
            <IconQuestion className={styles.icon} />
            How to use {getAppName()}?
          </Link>
        </li>
        <li className={styles.item}>
          <IconFilter className={styles.icon} />
          Filter
        </li>
        <li className={styles.item}>
          <Link href="/overview">
            <IconOverview className={styles.icon} />
            Technologies Overview
          </Link>
        </li>
        <li className={styles.item}>
          <IconSearch className={styles.icon} />
          Search
        </li>
      </ul>
    </nav>
  );
}
