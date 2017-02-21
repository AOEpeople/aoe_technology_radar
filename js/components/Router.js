import React from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';
import PageQuadrant from './PageQuadrant';
import PageItem from './PageItem';
import { quadrants, getItemPageNames } from '../../common/config';


const getPageByName = (items, pageName) => {
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
  if (getItemPageNames(items).includes(pageName)) {
    return PageItem;
  }

  return 'div';
}

export default function Router({ pageName, ...props}) {
  const Comp = getPageByName(props.items, pageName);
  return <Comp {...props} pageName={pageName} />;
}
