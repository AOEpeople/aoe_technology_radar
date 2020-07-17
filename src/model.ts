import { Ring } from "./config"

export type ItemAttributes = {
  name: string
  ring: Ring
  quadrant: string
  title: string
  featured: boolean
}

export type FlagType = 'new' | 'changed' | 'default'

export type Item = ItemAttributes & {
  featured: boolean
  body: string
  info: string
  flag: FlagType
  revisions: Revision[]
}

export type Revision = ItemAttributes & {
  body: string
  fileName: string
  release: string
}

export type Quadrant = {
  [name: string]: Item[]
}

export type Radar = {
  items: Item[]
  releases: string[]
}

export type Group = {
  [quadrant: string]: Quadrant
}

export const featuredOnly = (items: Item[]) => items.filter(item => item.featured);

export const groupByQuadrants = (items: Item[]): Group =>
  items.reduce(
    (quadrants, item: Item) => ({
      ...quadrants,
      [item.quadrant]: addItemToQuadrant(quadrants[item.quadrant], item),
    }),
    {} as {[k: string]: Quadrant},
  );

export const groupByFirstLetter = (items: Item[]) => {
  const index = items.reduce(
    (letterIndex, item) => ({
      ...letterIndex,
      [getFirstLetter(item)]: addItemToList(
        letterIndex[getFirstLetter(item)],
        item,
      ),
    }),
    {} as {[k: string]: Item[]},
  );

  return Object.keys(index)
    .sort()
    .map(letter => ({
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

export const getFirstLetter = (item: Item) => item.title.substr(0, 1).toUpperCase();
