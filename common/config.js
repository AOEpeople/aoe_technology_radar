export const quadrants = [
  'data-science-and-analytics',
  'methods-and-patterns',
  'platforms-and-aoe-services',
  'tools',
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
  'adopt',
  'trial',
  'assess',
  'hold'
];

const messages = {
  'data-science-and-analytics': 'Data Science & Analytics',
  'methods-and-patterns': 'Methods & Patterns',
  'platforms-and-aoe-services': 'Platforms and AOE Services',
  'tools': 'Tools',
};

export const translate = (key) => (messages[key] || '-');

export function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == 'undefined') return false;

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 1200;
}

const formatRelease = (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY');
