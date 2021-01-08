"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstLetter = exports.groupByFirstLetter = exports.groupByQuadrants = exports.featuredOnly = void 0;
exports.featuredOnly = (items) => items.filter(item => item.featured);
exports.groupByQuadrants = (items) => items.reduce((quadrants, item) => (Object.assign(Object.assign({}, quadrants), { [item.quadrant]: addItemToQuadrant(quadrants[item.quadrant], item) })), {});
exports.groupByFirstLetter = (items) => {
    const index = items.reduce((letterIndex, item) => (Object.assign(Object.assign({}, letterIndex), { [exports.getFirstLetter(item)]: addItemToList(letterIndex[exports.getFirstLetter(item)], item) })), {});
    return Object.keys(index)
        .sort()
        .map(letter => ({
        letter,
        items: index[letter],
    }));
};
const addItemToQuadrant = (quadrant = {}, item) => (Object.assign(Object.assign({}, quadrant), { [item.ring]: addItemToRing(quadrant[item.ring], item) }));
const addItemToList = (list = [], item) => [...list, item];
const addItemToRing = (ring = [], item) => [...ring, item];
exports.getFirstLetter = (item) => item.title.substr(0, 1).toUpperCase();
