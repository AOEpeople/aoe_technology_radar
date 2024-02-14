export enum Flag {
  New = "new",
  Changed = "changed",
  Default = "default",
}

export type Release = string;

export interface Revision {
  release: Release;
  ring: string;
  body?: string;
}

export interface Item {
  id: string;
  title: string;
  info?: string;
  body: string;
  featured: boolean;
  ring: string;
  quadrant: string;
  flag: Flag;
  tags: string[];
  revisions?: Revision[];
}

export interface Ring {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface Quadrant {
  id: string;
  title: string;
  description: string;
  color: string;
  position: number;
  items?: Item[];
}
