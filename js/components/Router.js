import React from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';
import PageQuadrant from './PageQuadrant';
import { quadrants } from '../../common/config';


const getPageByName = (pageName) => {
  if (pageName === 'index') {
    return PageIndex;
  }
  if (pageName === 'overview') {
    return PageOverview;
  }
  if (pageName === 'help') {
    return PageHelp;
  }
  if (quadrants.includes(pageName)) {
    return PageQuadrant;
  }

  return 'div';
}

export default function Router({ pageName, ...props}) {
  const Comp = getPageByName(pageName);
  return <Comp {...props} pageName={pageName} />;
}
