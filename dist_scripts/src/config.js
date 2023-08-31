"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.assetUrl = exports.publicUrl = exports.isCustomMode = exports.isMobileViewport = exports.getItemPageNames = exports.setTitle = exports.titleFormat = exports.radarNameShort = exports.radarName = void 0;
exports.radarName = process.env.REACT_APP_RADAR_NAME || "AOE Technology Radar";
exports.radarNameShort = exports.radarName;
exports.titleFormat = process.env.REACT_APP_RADAR_TITLE_FORMAT || "%TECHNOLOGY_NAME% | %APP_TITLE%";
function setTitle(document, title) {
    document.title = title
        ? exports.titleFormat
            .replace("%TECHNOLOGY_NAME%", title)
            .replace("%APP_TITLE%", exports.radarName)
        : exports.radarName;
}
exports.setTitle = setTitle;
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
exports.isCustomMode = process.env.REACT_APP_CUSTOM_MODE === "true" || false;
exports.publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "") + "/";
function assetUrl(file) {
    return exports.publicUrl + file;
}
exports.assetUrl = assetUrl;
function translate(config, key) {
    return config.quadrants[key] || "-";
}
exports.translate = translate;
