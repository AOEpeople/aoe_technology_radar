"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetUrl = exports.isMobileViewport = exports.translate = exports.showEmptyRings = exports.getItemPageNames = exports.rings = exports.quadrants = exports.radarNameShort = exports.radarName = void 0;
exports.radarName = process.env.RADAR_NAME || 'AOE Technology Radar';
exports.radarNameShort = exports.radarName;
exports.quadrants = [
    'languages-and-frameworks',
    'methods-and-patterns',
    'platforms-and-services',
    'tools',
];
exports.rings = [
    'all',
    'emerging',
    'appointed',
    'preserving',
    'sunset'
];
exports.getItemPageNames = (items) => items.map(item => `${item.quadrant}/${item.name}`);
exports.showEmptyRings = true;
const messages = {
    'languages-and-frameworks': 'Languages & Frameworks',
    'methods-and-patterns': 'Methods & Patterns',
    'platforms-and-services': 'Platforms and Operations',
    'tools': 'Tools',
};
exports.translate = (key) => (messages[key] || '-');
function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == 'undefined')
        return false;
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 1200;
}
exports.isMobileViewport = isMobileViewport;
function assetUrl(file) {
    return process.env.PUBLIC_URL + '/' + file;
    // return `/techradar/assets/${file}`
}
exports.assetUrl = assetUrl;
