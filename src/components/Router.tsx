import React, { useState, useEffect } from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';
import PageQuadrant from './PageQuadrant';
import PageItem from './PageItem';
import PageItemMobile from './PageItemMobile';
import { quadrants, getItemPageNames, isMobileViewport } from '../config';
import { Item } from '../model';

export default function Router({ pageName, items, releases }: {pageName: string, items: Item[], releases: string[]}) {
  enum page {
    index,
    overview,
    help,
    quadrant,
    itemMobile,
    item,
    notFound,
  }

  const getPageByName = (items: Item[], pageName: string): page => {
    if (pageName === 'index') {
      return page.index;
    }
    if (pageName === 'overview') {
      return page.overview;
    }
    if (pageName === 'help-and-about-tech-radar') {
      return page.help;
    }
    if (quadrants.includes(pageName)) {
      return page.quadrant;
    }
    if (getItemPageNames(items).includes(pageName)) {
      return isMobileViewport() ? page.itemMobile : page.item;
    }
  
    return page.notFound;
  }

  const [statePageName, setStatePageName] = useState(pageName);
  const [leaving, setLeaving] = useState(false);
  const [nextPageName, setNextPageName] = useState<string>("");

  useEffect(() => {
    const leaving = getPageByName(items, pageName) !== getPageByName(items, statePageName);
    if (leaving) {
      setLeaving(true)
    }
    setNextPageName(pageName)
  }, [pageName, items, statePageName])

  const handlePageLeave = () => {
    setLeaving(true)
    setStatePageName(nextPageName);
    setNextPageName("")

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setLeaving(false);
      });
    }, 0);
  };

  switch (getPageByName(items, pageName)) {
    case page.index:
      return <PageIndex leaving={leaving} items={items} onLeave={handlePageLeave} releases={releases} />
      case page.overview:
        return <PageOverview items={items} rings={[]} search={""} leaving={leaving} onLeave={handlePageLeave}/>
      case page.help:
        return <PageHelp leaving={leaving} onLeave={handlePageLeave}/>
      case page.quadrant:
        return <PageQuadrant leaving={leaving} onLeave={handlePageLeave} items={items} pageName={pageName} />
      case page.itemMobile:
        return <PageItemMobile items={items} pageName={pageName} leaving={leaving} onLeave={handlePageLeave}/>
      case page.item:
        return <PageItem items={items} pageName={pageName} leaving={leaving} onLeave={handlePageLeave}/>
      default:
        return <div/>
  }
}
