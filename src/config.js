export var radarName = process.env.RADAR_NAME || 'AOE Technology Radar';
export var radarNameShort = radarName;
export var quadrants = [
    'languages-and-frameworks',
    'methods-and-patterns',
    'platforms-and-aoe-services',
    'tools',
];
export var rings = [
    'all',
    'adopt',
    'trial',
    'assess',
    'hold'
];
export var getItemPageNames = function (items) { return items.map(function (item) { return item.quadrant + "/" + item.name; }); };
export var showEmptyRings = false;
var messages = {
    'languages-and-frameworks': 'Languages & Frameworks',
    'methods-and-patterns': 'Methods & Patterns',
    'platforms-and-aoe-services': 'Platforms and Operations',
    'tools': 'Tools',
};
export var translate = function (key) { return (messages[key] || '-'); };
export function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == 'undefined')
        return false;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 1200;
}
export function assetUrl(file) {
    return process.env.PUBLIC_URL + '/' + file;
    // return `/techradar/assets/${file}`
}
