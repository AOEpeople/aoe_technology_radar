import styles from "./Departments.module.css";

import { cn } from "@/lib/utils";

type DepartmentProps = {
  department: string;
};

export function Department({ department }: DepartmentProps) {
  return (
    <div className={styles.department}>
      <span>{department}</span>
    </div>
  );
}

interface DepartmentsProps {
  departments: string[];
}

export function Departments({ departments }: DepartmentsProps) {
  return (
    <div className={cn(styles.departments)}>
      {departments.map((department) => (
        <Department key={department} department={department} />
      ))}
    </div>
  );
}
