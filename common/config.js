export const getPageNames = (radar) => {
  return [
    'index',
    'overview',
    'help',
    'foo/bar',
  ]
}

export const quadrants = [
  'languages-and-frameworks',
  'methods-and-patterns',
  'platforms-and-aoe-services',
  'tools',
];

export const rings = [
  'assess',
  'trial',
  'hold',
  'adopt',
];

const messages = {
  'languages-and-frameworks': 'Languages & Frameworks',
  'methods-and-patterns': 'Methods & Patterns',
  'platforms-and-aoe-services': 'Platforms and AOE Services',
  'tools': 'Tools',
};

export const translate = (key) => (messages[key] || '-');

const formatRelease = (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY');
