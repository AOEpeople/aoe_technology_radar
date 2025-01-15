import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

import styles from "./DepartmentFilter.module.css";

import IconRemove from "@/components/Icons/Close";
import IconDepartment from "@/components/Icons/Department";
import { getDepartments, getLabel } from "@/lib/data";
import { cn } from "@/lib/utils";

type DepartmentProps = {
  department: string;
  isActive?: boolean;
} & Omit<LinkProps, "href"> &
  ComponentPropsWithoutRef<"a">;

function Department({ department, isActive, ...props }: DepartmentProps) {
  const Icon = isActive ? IconRemove : IconDepartment;
  return (
    <Link
      {...props}
      className={cn(styles.department, isActive && styles.active)}
      href={isActive ? "/" : `/?department=${department}`}
    >
      <Icon className={cn(styles.icon)} />
      <span className={styles.label}>{department}</span>
    </Link>
  );
}

interface DepartmentFilterProps {
  activeDepartment?: string;
  className?: string;
}

export function DepartmentFilter({
  activeDepartment,
  className,
}: DepartmentFilterProps) {
  const label = getLabel("filterByDepartment");
  const departments = getDepartments();

  return (
    <div className={cn(styles.teams, className)}>
      {!!label && <h3>{label}</h3>}
      {departments.map((department) => (
        <Department
          key={department}
          department={department}
          isActive={activeDepartment === department}
          scroll={false}
        />
      ))}
    </div>
  );
}
