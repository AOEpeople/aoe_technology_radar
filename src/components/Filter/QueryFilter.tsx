import { ChangeEvent } from "react";

import Search from "../Icons/Search";
import styles from "./QueryFilter.module.css";

interface QueryFilterProps {
  value?: string;
  onChange: (value: string) => void;
}
export function QueryFilter({ value, onChange }: QueryFilterProps) {
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.filter}>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={_onChange}
      />
      <button className={styles.button} type="submit">
        <Search className={styles.icon} />
      </button>
    </div>
  );
}
