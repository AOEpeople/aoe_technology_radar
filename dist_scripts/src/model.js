"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = exports.filteredOnly = exports.getFirstLetter = exports.groupByFirstLetter = exports.groupByQuadrants = exports.nonFeaturedOnly = exports.featuredOnly = exports.FlagType = exports.HomepageOption = void 0;
var HomepageOption;
(function (HomepageOption) {
    HomepageOption["chart"] = "chart";
    HomepageOption["columns"] = "columns";
    HomepageOption["both"] = "both";
})(HomepageOption = exports.HomepageOption || (exports.HomepageOption = {}));
var FlagType;
(function (FlagType) {
    FlagType["new"] = "new";
    FlagType["changed"] = "changed";
    FlagType["default"] = "default";
})(FlagType = exports.FlagType || (exports.FlagType = {}));
var featuredOnly = function (items) {
    return items.filter(function (item) { return item.featured; });
};
exports.featuredOnly = featuredOnly;
var nonFeaturedOnly = function (items) {
    return items.filter(function (item) { return !item.featured; });
};
exports.nonFeaturedOnly = nonFeaturedOnly;
var groupByQuadrants = function (items) {
    return items.reduce(function (quadrants, item) {
        var _a;
        return (__assign(__assign({}, quadrants), (_a = {}, _a[item.quadrant] = addItemToQuadrant(quadrants[item.quadrant], item), _a)));
    }, {});
};
exports.groupByQuadrants = groupByQuadrants;
var groupByFirstLetter = function (items) {
    var index = items.reduce(function (letterIndex, item) {
        var _a;
        return (__assign(__assign({}, letterIndex), (_a = {}, _a[(0, exports.getFirstLetter)(item)] = addItemToList(letterIndex[(0, exports.getFirstLetter)(item)], item), _a)));
    }, {});
    return Object.keys(index)
        .sort()
        .map(function (letter) { return ({
        letter: letter,
        items: index[letter],
    }); });
};
exports.groupByFirstLetter = groupByFirstLetter;
var addItemToQuadrant = function (quadrant, item) {
    var _a;
    if (quadrant === void 0) { quadrant = {}; }
    return (__assign(__assign({}, quadrant), (_a = {}, _a[item.ring] = addItemToRing(quadrant[item.ring], item), _a)));
};
var addItemToList = function (list, item) {
    if (list === void 0) { list = []; }
    return __spreadArray(__spreadArray([], list, true), [item], false);
};
var addItemToRing = function (ring, item) {
    if (ring === void 0) { ring = []; }
    return __spreadArray(__spreadArray([], ring, true), [item], false);
};
var getFirstLetter = function (item) {
    return item.title.substr(0, 1).toUpperCase();
};
exports.getFirstLetter = getFirstLetter;
var filteredOnly = function (items, tags) {
    return items.filter(function (item) {
        var itemTags = item.tags;
        if (typeof itemTags === "undefined") {
            return false;
        }
        if (Array.isArray(tags)) {
            return tags.every(function (tag) { return itemTags.includes(tag); });
        }
        return itemTags.includes(tags);
    });
};
exports.filteredOnly = filteredOnly;
var getTags = function (items) {
    var tags = items
        .reduce(function (acc, item) {
        return !item.tags ? acc : acc.concat(item.tags);
    }, [])
        .sort();
    return Array.from(new Set(tags));
};
exports.getTags = getTags;
