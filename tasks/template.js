import pug from 'pug';
import moment from 'moment';
import { relativePath } from '../common/file';
import {
  groupByQuadrants,
  groupByFirstLetter,
  groupByRing,
} from './radar';

const templateFolder = 'templates';

export const vars = (vars) => ({
  translate: (text) => {
    const mappings = {
      'data-science-and-analytics': 'Data Science & Analytics',
      'infrastructure-and-operational-technology': 'Infrastructure & Operational Technology',
      'platforms-and-partners': 'Platforms & Partners',
      'ui-and-devices': 'UI & Devices',
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
