export const quadrants = [
    'data-science-and-analytics',
    'infrastructure-and-operational-technology',
    'platforms-and-partners',
    'ui-and-devices',
];

export function assetUrl(file) {
  return `/techradar/assets/${file}`
}

export const getPageNames = (radar) => {
  return [
    'index',
    'overview',
    'help-and-about-tech-radar',
    'aoe-toolbox',
    ...quadrants,
    ...getItemPageNames(radar.items),
  ]
}

export const getItemPageNames = (items) => items.map(item => `${item.quadrant}/${item.name}`);

export const rings = [
  'discover',
  'productize',
  'scale'
];

const messages = {
  'data-science-and-analytics': 'Data Science & Analytics',
  'infrastructure-and-operational-technology': 'Infrastructure & Operational Technology',
  'platforms-and-partners': 'Platforms & Partners',
  'ui-and-devices': 'UI & Devices',
};

export const translate = (key) => (messages[key] || '-');

export function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == 'undefined') return false;

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 1200;
}

const formatRelease = (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY');
