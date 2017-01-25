import pug from 'pug';
import { relativePath } from './file';

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
  ...vars,
})

export const item = pug.compileFile(relativePath(templateFolder, 'item.pug'));

export const quadrant = pug.compileFile(relativePath(templateFolder, 'quadrant.pug'));
