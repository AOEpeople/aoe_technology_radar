import { ChangeEvent, useEffect, useState } from "react";

import Search from "../Icons/Search";
import styles from "./QueryFilter.module.css";

import { getLabel } from "@/lib/data";

interface QueryFilterProps {
  value?: string;
  onChange: (value: string) => void;
}

export function QueryFilter({ value, onChange }: QueryFilterProps) {
  const [val, setVal] = useState(value);
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={styles.filter}>
      <input
        className={styles.input}
        id="search"
        type="search"
        placeholder={getLabel("searchPlaceholder")}
        value={val}
        onChange={_onChange}
      />
      <button className={styles.button} type="submit">
        <Search className={styles.icon} />
      </button>
    </div>
  );
}
