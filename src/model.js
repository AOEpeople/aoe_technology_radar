var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
export var featuredOnly = function (items) { return items.filter(function (item) { return item.featured; }); };
export var groupByQuadrants = function (items) {
    return items.reduce(function (quadrants, item) {
        var _a;
        return (__assign(__assign({}, quadrants), (_a = {}, _a[item.quadrant] = addItemToQuadrant(quadrants[item.quadrant], item), _a)));
    }, {});
};
export var groupByFirstLetter = function (items) {
    var index = items.reduce(function (letterIndex, item) {
        var _a;
        return (__assign(__assign({}, letterIndex), (_a = {}, _a[getFirstLetter(item)] = addItemToList(letterIndex[getFirstLetter(item)], item), _a)));
    }, {});
    return Object.keys(index)
        .sort()
        .map(function (letter) { return ({
        letter: letter,
        items: index[letter],
    }); });
};
var addItemToQuadrant = function (quadrant, item) {
    var _a;
    if (quadrant === void 0) { quadrant = {}; }
    return (__assign(__assign({}, quadrant), (_a = {}, _a[item.ring] = addItemToRing(quadrant[item.ring], item), _a)));
};
var addItemToList = function (list, item) {
    if (list === void 0) { list = []; }
    return __spreadArray(__spreadArray([], list), [item]);
};
var addItemToRing = function (ring, item) {
    if (ring === void 0) { ring = []; }
    return __spreadArray(__spreadArray([], ring), [item]);
};
export var getFirstLetter = function (item) { return item.title.substr(0, 1).toUpperCase(); };
