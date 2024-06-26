import styles from "./Teams.module.css";

import IconTeam from "@/components/Icons/Team";
import { cn } from "@/lib/utils";

type TeamProps = {
  team: string;
};

export function Team({ team }: TeamProps) {
  return (
    <div className={styles.team}>
      <IconTeam className={cn(styles.icon)} />
      <span>{team}</span>
    </div>
  );
}

interface TeamsProps {
  teams: string[];
}

export function Teams({ teams }: TeamsProps) {
  return (
    <div className={cn(styles.teams)}>
      <h3 className={styles.teamtitle}>Team(s)</h3>
      {teams.map((team) => (
        <Team key={team} team={team} />
      ))}
    </div>
  );
}
