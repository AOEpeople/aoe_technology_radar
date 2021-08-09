"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetUrl = exports.isMobileViewport = exports.translate = exports.showEmptyRings = exports.getItemPageNames = exports.rings = exports.quadrants = exports.radarNameShort = exports.radarName = void 0;
exports.radarName = process.env.REACT_APP_RADAR_NAME || "AOE Technology Radar";
exports.radarNameShort = exports.radarName;
exports.quadrants = [
    "languages-and-frameworks",
    "data-integration-and-transformation",
    "data-storage-and-compute",
    "platforms-and-tools",
];
exports.rings = ["all", "adopt", "trial", "assess", "hold"];
var getItemPageNames = function (items) {
    return items.map(function (item) { return item.quadrant + "/" + item.name; });
};
exports.getItemPageNames = getItemPageNames;
exports.showEmptyRings = false;
var messages = {
    "languages-and-frameworks": "Languages & Frameworks",
    "methods-and-patterns": "Methods & Patterns",
    "platforms-and-aoe-services": "Platforms & Operations",
    tools: "Tools",
};
var translate = function (key) { return messages[key] || "-"; };
exports.translate = translate;
function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == "undefined")
        return false;
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    return width < 1200;
}
exports.isMobileViewport = isMobileViewport;
function assetUrl(file) {
    return process.env.PUBLIC_URL + "/" + file;
}
exports.assetUrl = assetUrl;
