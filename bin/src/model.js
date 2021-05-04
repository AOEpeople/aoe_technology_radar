"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstLetter = exports.groupByFirstLetter = exports.groupByQuadrants = exports.featuredOnly = exports.FlagType = exports.Ring = exports.HomepageOption = void 0;
var HomepageOption;
(function (HomepageOption) {
    HomepageOption[HomepageOption["chart"] = 0] = "chart";
    HomepageOption[HomepageOption["columns"] = 1] = "columns";
    HomepageOption[HomepageOption["both"] = 2] = "both";
})(HomepageOption = exports.HomepageOption || (exports.HomepageOption = {}));
var Ring;
(function (Ring) {
    Ring[Ring["all"] = 0] = "all";
    Ring[Ring["adopt"] = 1] = "adopt";
    Ring[Ring["trial"] = 2] = "trial";
    Ring[Ring["assess"] = 3] = "assess";
    Ring[Ring["hold"] = 4] = "hold";
})(Ring = exports.Ring || (exports.Ring = {}));
var FlagType;
(function (FlagType) {
    FlagType["new"] = "new";
    FlagType["changed"] = "changed";
    FlagType["default"] = "default";
})(FlagType = exports.FlagType || (exports.FlagType = {}));
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
