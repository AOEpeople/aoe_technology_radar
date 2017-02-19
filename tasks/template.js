import pug from 'pug';
import moment from 'moment';
import { relativePath } from './file';
import {
  groupByQuadrants,
  groupByFirstLetter,
  groupByRing,
} from './radar';

const templateFolder = 'templates';

export const vars = (vars) => ({
  translate: (text) => {
    const mappings = {
      'languages-and-frameworks': 'Languages & Frameworks',
      'methods-and-patterns': 'Methods & Patterns',
      'platforms-and-aoe-services': 'Platforms and AOE Services',
      'tools': 'Tools',
    };

    return mappings[text.trim()] || '-';
  },
  formatRelease: (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY'),
  groupByQuadrants,
  groupByFirstLetter,
  groupByRing,
  ...vars,
})

export const item = pug.compileFile(relativePath(templateFolder, 'item-page.pug'));

export const quadrant = pug.compileFile(relativePath(templateFolder, 'quadrant-page.pug'));
