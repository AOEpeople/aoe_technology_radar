"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobileViewport = exports.translate = exports.getItemPageNames = exports.assetUrl = exports.rings = exports.quadrants = exports.radarNameShort = exports.radarName = void 0;
exports.radarName = process.env.RADAR_NAME || 'AOE Technology Radar';
exports.radarNameShort = exports.radarName;
exports.quadrants = [
    'languages-and-frameworks',
    'methods-and-patterns',
    'platforms-and-aoe-services',
    'tools',
];
exports.rings = [
    'all',
    'adopt',
    'trial',
    'assess',
    'hold'
];
// todo: fix
function assetUrl(file) {
    return process.env.PUBLIC_URL + '/' + file;
    // return `/techradar/assets/${file}`
}
exports.assetUrl = assetUrl;
exports.getItemPageNames = (items) => items.map(item => `${item.quadrant}/${item.name}`);
const messages = {
    'languages-and-frameworks': 'Languages & Frameworks',
    'methods-and-patterns': 'Methods & Patterns',
    'platforms-and-aoe-services': 'Platforms and Operations',
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
