export const featuredOnly = items => items.filter(item => item.featured);

export const groupByQuadrants = items =>
  items.reduce(
    (quadrants, item) => ({
      ...quadrants,
      [item.quadrant]: addItemToQuadrant(quadrants[item.quadrant], item),
    }),
    {},
  );

export const groupByRing = items =>
  items.reduce(
    (rings, item) => ({
      ...rings,
      [item.ring]: addItemToList(rings[item.ring], item),
    }),
    {},
  );

export const groupByFirstLetter = items => {
  const index = items.reduce(
    (letterIndex, item) => ({
      ...letterIndex,
      [getFirstLetter(item)]: addItemToList(
        letterIndex[getFirstLetter(item)],
        item,
      ),
    }),
    {},
  );

  return Object.keys(index)
    .sort()
    .map(letter => ({
      letter,
      items: index[letter],
    }));
};

const addItemToQuadrant = (quadrant = {}, item) => ({
  ...quadrant,
  [item.ring]: addItemToRing(quadrant[item.ring], item),
});

const addItemToList = (list = [], item) => [...list, item];

const addItemToRing = (ring = [], item) => [...ring, item];

export const getFirstLetter = item => item.title.substr(0, 1).toUpperCase();
