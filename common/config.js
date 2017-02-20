export const getPageNames = (radar) => {
  return [
    'index',
    'overview',
    'help',
    'foo/bar',
  ]
}

const messages = {
  'languages-and-frameworks': 'Languages & Frameworks',
  'methods-and-patterns': 'Methods & Patterns',
  'platforms-and-aoe-services': 'Platforms and AOE Services',
  'tools': 'Tools',
};

export const translate = (key) => (messages[key] || '-');

const formatRelease = (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY');
