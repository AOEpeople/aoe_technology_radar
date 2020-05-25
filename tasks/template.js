import pug from 'pug';
import moment from 'moment';
import { translate } from '../common/config';
import { relativePath } from '../common/file';
import {
  groupByQuadrants,
  groupByFirstLetter,
  groupByRing,
} from './radar';

const templateFolder = 'templates';

export const vars = (vars) => ({
  translate: translate,
  formatRelease: (release) => moment(release, 'YYYY-MM-DD').format('MMM YYYY'),
  groupByQuadrants,
  groupByFirstLetter,
  groupByRing,
  ...vars,
});

export const item = pug.compileFile(relativePath(templateFolder, 'item-page.pug'));

export const quadrant = pug.compileFile(relativePath(templateFolder, 'quadrant-page.pug'));
