import Link from "next/link";

import styles from "./Navigation.module.css";

import IconOverview from "@/components/Icons/Overview";
import IconQuestion from "@/components/Icons/Question";
import { getLabel } from "@/lib/data";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/help-and-about-tech-radar">
            <IconQuestion className={styles.icon} />
            <span className={styles.label}>{getLabel("pageAbout")}</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/overview">
            <IconOverview className={styles.icon} />
            <span className={styles.label}>{getLabel("pageOverview")}</span>
          </Link>
        </li>
        {/*
        <li className={styles.item}>
          <Link href="/overview">
            <IconSearch className={styles.icon} />
            <span className={styles.label}>{getLabel("pageSearch")}</span>
          </Link>
        </li>
        */}
      </ul>
    </nav>
  );
}
