import React, {useState, useEffect} from 'react';
import PageIndex from './PageIndex/PageIndex';
import PageOverview from './PageOverview/PageOverview';
import PageHelp from './PageHelp/PageHelp';
import PageQuadrant from './PageQuadrant/PageQuadrant';
import PageItem from './PageItem/PageItem';
import PageItemMobile from './PageItemMobile/PageItemMobile';
import {quadrants, getItemPageNames, isMobileViewport, rings} from '../config';
import {Item} from '../model';

type RouterProps = {
    pageName: string
    items: Item[]
    releases: string[]
    search: string
}

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
};

export default function Router({pageName, items, releases, search}: RouterProps) {
    const [statePageName, setStatePageName] = useState(pageName);
    const [leaving, setLeaving] = useState(false);
    const [nextPageName, setNextPageName] = useState<string>('');

    useEffect(() => {
        const nowLeaving = getPageByName(items, pageName) !== getPageByName(items, statePageName);
        if (nowLeaving) {
            setLeaving(true);
            setNextPageName(pageName);
        } else {
            setStatePageName(pageName);
        }
    }, [pageName, items, statePageName]);

    const handlePageLeave = () => {
        setStatePageName(nextPageName);
        setNextPageName('');

        window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                setLeaving(false);
            });
        }, 0);
    };

    switch (getPageByName(items, statePageName)) {
        case page.index:
            return <PageIndex leaving={leaving} items={items} onLeave={handlePageLeave} releases={releases}/>;
        case page.overview:
            return <PageOverview items={items} rings={rings} search={search} leaving={leaving}
                                 onLeave={handlePageLeave}/>;
        case page.help:
            return <PageHelp leaving={leaving} onLeave={handlePageLeave}/>;
        case page.quadrant:
            return <PageQuadrant leaving={leaving} onLeave={handlePageLeave} items={items} pageName={statePageName}/>;
        case page.itemMobile:
            return <PageItemMobile items={items} pageName={statePageName} leaving={leaving} onLeave={handlePageLeave}/>;
        case page.item:
            return <PageItem items={items} pageName={statePageName} leaving={leaving} onLeave={handlePageLeave}/>;
        default:
            return <div/>;
    }
}
