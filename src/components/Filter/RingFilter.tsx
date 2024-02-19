import styles from "./RingFilter.module.css";

import { Badge, RingBadge } from "@/components/Badge/Badge";
import { getRings } from "@/lib/data";
import { cn } from "@/lib/utils";

interface RingFilterProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RingFilter({ value, onChange, className }: RingFilterProps) {
  const rings = getRings();

  return (
    <ul className={cn(styles.filter, className)}>
      <li>
        <Badge
          size="large"
          selectable
          selected={!value}
          onClick={() => {
            onChange("");
          }}
        >
          All
        </Badge>
      </li>
      {rings.map((ring) => (
        <li key={ring.id}>
          <RingBadge
            ring={ring.id}
            size="large"
            selectable
            selected={value === ring.id}
            onClick={() => onChange(ring.id)}
          />
        </li>
      ))}
    </ul>
  );
}
