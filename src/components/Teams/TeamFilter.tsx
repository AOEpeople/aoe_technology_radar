import styles from "./TeamFilter.module.css";

import IconTeam from "@/components/Icons/Team";
import { getLabel, getTeams } from "@/lib/data";
import { cn } from "@/lib/utils";

type TeamProps = {
  team: string;
  isActive?: boolean;
  onClick: () => void;
};

function Team({ team, isActive, onClick }: TeamProps) {
  return (
    <button
      className={cn(styles.team, isActive && styles.active)}
      onClick={onClick}
    >
      <IconTeam className={cn(styles.icon)} />
      <span className={styles.label}>{team}</span>
    </button>
  );
}

interface TeamFilterProps {
  activeTeam?: string;
  onChange: (team: string) => void;
  className?: string;
}

export function TeamFilter({
  activeTeam,
  onChange,
  className,
}: TeamFilterProps) {
  const label = getLabel("filterByTeam");
  const teams = getTeams();

  return (
    <div className={cn(styles.teams, className)}>
      {!!label && <h3>{label}</h3>}
      {teams.map((team) => (
        <Team
          key={team}
          team={team}
          isActive={activeTeam === team}
          onClick={() => onChange(activeTeam === team ? "" : team)}
        />
      ))}
    </div>
  );
}
