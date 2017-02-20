import React from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';

export default function Router({ pageName, ...props}) {
  let Comp;
  switch (pageName) {
    case 'index':
      Comp = PageIndex;
      break;
    case 'overview':
      Comp = PageOverview;
      break;
    case 'help':
      Comp = PageHelp;
      break;
    default:
      Comp = 'div';
      break;
  }

  return <Comp {...props} />;
}
