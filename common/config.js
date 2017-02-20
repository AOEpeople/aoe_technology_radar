export const getPageNames = (radar) => {
  return [
    'index',
    'overview',
    'help',
    'foo/bar',
  ]
}

const mappings = {
  'languages-and-frameworks': 'Languages & Frameworks',
  'methods-and-patterns': 'Methods & Patterns',
  'platforms-and-aoe-services': 'Platforms and AOE Services',
  'tools': 'Tools',
};


const formatRelease = (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY');
