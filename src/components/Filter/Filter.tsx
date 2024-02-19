import styles from "./Filter.module.css";

import { QueryFilter } from "@/components/Filter/QueryFilter";
import { RingFilter } from "@/components/Filter/RingFilter";

interface FilterProps {
  query?: string;
  onQueryChange: (query: string) => void;
  ring?: string;
  onRingChange: (ring: string) => void;
}

export function Filter({
  query,
  onQueryChange,
  ring,
  onRingChange,
}: FilterProps) {
  return (
    <div className={styles.filter}>
      <QueryFilter value={query} onChange={onQueryChange} />
      <RingFilter value={ring} onChange={onRingChange} />
    </div>
  );
}
