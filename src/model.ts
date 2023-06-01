export enum HomepageOption {
  chart = "chart",
  columns = "columns",
  both = "both",
}

export type ItemAttributes = {
  name: string;
  ring: string;
  quadrant: string;
  title: string;
  featured?: boolean;
  tags?: string[];
};

export enum FlagType {
  new = "new",
  changed = "changed",
  default = "default",
}

export type Item = ItemAttributes & {
  featured: boolean;
  body: string;
  info: string;
  flag: FlagType;
  revisions: Revision[];
  angleFraction?: number;
  radiusFraction?: number;
};

export type Blip = Item & {
  quadrantPosition: number;
  ringPosition: number;
  colour: string;
  txtColour: string;
  coordinates: Point;
};

export type Revision = ItemAttributes & {
  body: string;
  fileName: string;
  release: string;
};

export type Quadrant = {
  [name: string]: Item[];
};

export type QuadrantConfig = {
  colour: string;
  txtColour: string;
  position: number;
  description: string;
};

export type Radar = {
  items: Item[];
  releases: string[];
};

export type Group = {
  [quadrant: string]: Quadrant;
};

export const featuredOnly = (items: Item[]) =>
  items.filter((item) => item.featured);
export const nonFeaturedOnly = (items: Item[]) =>
  items.filter((item) => !item.featured);

export type Point = {
  x: number;
  y: number;
};

export const groupByQuadrants = (items: Item[]): Group =>
  items.reduce(
    (quadrants, item: Item) => ({
      ...quadrants,
      [item.quadrant]: addItemToQuadrant(quadrants[item.quadrant], item),
    }),
    {} as { [k: string]: Quadrant }
  );

export const groupByFirstLetter = (items: Item[]) => {
  const index = items.reduce(
    (letterIndex, item) => ({
      ...letterIndex,
      [getFirstLetter(item)]: addItemToList(
        letterIndex[getFirstLetter(item)],
        item
      ),
    }),
    {} as { [k: string]: Item[] }
  );

  return Object.keys(index)
    .sort()
    .map((letter) => ({
      letter,
      items: index[letter],
    }));
};

const addItemToQuadrant = (quadrant: Quadrant = {}, item: Item): Quadrant => ({
  ...quadrant,
  [item.ring]: addItemToRing(quadrant[item.ring], item),
});

const addItemToList = (list: Item[] = [], item: Item) => [...list, item];

const addItemToRing = (ring: Item[] = [], item: Item) => [...ring, item];

export const getFirstLetter = (item: Item) =>
  item.title.substr(0, 1).toUpperCase();

export type Tag = string;

export const filteredOnly = (items: Item[], tags: Tag[] | string) => {
  return items.filter((item: Item) => {
    const { tags: itemTags } = item;

    if (typeof itemTags === "undefined") {
      return false;
    }

    if (Array.isArray(tags)) {
      return tags.every(tag => itemTags.includes(tag));
    }

    return itemTags.includes(tags);
  });
}

export const getTags = (items: Item[]): Tag[] => {
  const tags: Tag[] = items.reduce((acc: Tag[], item: Item) => {
    return !item.tags ? acc : acc.concat(item.tags);
  }, []).sort();

  return Array.from(new Set(tags));
};