import path from 'path';

export const relativePath = (...relativePath) => (
  path.resolve(__dirname, '..', ...relativePath)
);

export const srcPath = (...pathInSrc) => (
  relativePath('radar', ...pathInSrc)
);

export const distPath = (...pathInDist) => (
  relativePath('dist', ...pathInDist)
);
