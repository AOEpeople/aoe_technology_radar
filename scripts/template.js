import pug from 'pug';
import { relativePath } from './file';

const templateFolder = 'templates';

export const item = pug.compileFile(relativePath(templateFolder, 'item.pug'));
