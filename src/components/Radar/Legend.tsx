import { ComponentPropsWithoutRef } from "react";

import styles from "./Legend.module.css";

import BlipChanged from "@/components/Icons/BlipChanged";
import BlipDefault from "@/components/Icons/BlipDefault";
import BlipNew from "@/components/Icons/BlipNew";
import { getFlags } from "@/lib/data";
import { Flag } from "@/lib/types";

function Icon({
  flag,
  ...props
}: { flag: Flag } & ComponentPropsWithoutRef<"svg">) {
  switch (flag) {
    case Flag.New:
      return <BlipNew {...props} />;
    case Flag.Changed:
      return <BlipChanged {...props} />;
    case Flag.Default:
      return <BlipDefault {...props} />;
  }
}

export function Legend() {
  return (
    <ul className={styles.legend}>
      {Object.entries(getFlags()).map(([key, flag]) => (
        <li key={key}>
          <Icon flag={key as Flag} className={styles.icon} />
          <span className={styles.label}>{flag.description}</span>
        </li>
      ))}
    </ul>
  );
}
