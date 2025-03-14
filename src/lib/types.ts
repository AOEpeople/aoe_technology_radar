export enum Flag {
  New = "new",
  Changed = "changed",
  Default = "default",
}

export type Release = string; //  "YYYY-MM-DD" format

export interface Revision {
  release: Release;
  ring: Ring["id"];
  body?: string;
}

export interface Item {
  id: string;
  title: string;
  info?: string;
  body: string;
  featured: boolean;
  ring: string;
  segment: string;
  quadrant?: string; // deprecated - users should update to `segment`
  flag: Flag;
  tags?: string[];
  release: Release;
  revisions?: Revision[];
  position: [x: number, y: number];
}

export interface Ring {
  id: string;
  title: string;
  description: string;
  color: string;
  radius?: number;
  strokeWidth?: number;
}

export interface Segment {
  id: string;
  title: string;
  description: string;
  color: string;
  position: number;
}
