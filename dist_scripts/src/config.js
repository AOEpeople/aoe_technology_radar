"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.assetUrl = exports.publicUrl = exports.isMobileViewport = exports.getItemPageNames = exports.radarNameShort = exports.radarName = void 0;
exports.radarName = process.env.REACT_APP_RADAR_NAME || "AOE Technology Radar";
exports.radarNameShort = exports.radarName;
var getItemPageNames = function (items) {
    return items.map(function (item) { return "".concat(item.quadrant, "/").concat(item.name); });
};
exports.getItemPageNames = getItemPageNames;
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
exports.publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "") + "/";
function assetUrl(file) {
    return exports.publicUrl + file;
}
exports.assetUrl = assetUrl;
function translate(config, key) {
    return config.quadrants[key] || "-";
}
exports.translate = translate;
