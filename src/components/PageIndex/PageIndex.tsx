import React from 'react';
import { formatRelease } from '../../date';
import { featuredOnly, Item, HomepageOption } from '../../model';
import HeroHeadline from '../HeroHeadline/HeroHeadline';
import QuadrantGrid from '../QuadrantGrid/QuadrantGrid';
import RadarGrid from '../RadarGrid/RadarGrid';
import Fadeable from '../Fadeable/Fadeable';
import SetTitle from '../SetTitle';
import { radarName, radarNameShort, homepageContent } from '../../config';
import { MomentInput } from 'moment';

type PageIndexProps = {
  leaving: boolean;
  onLeave: () => void;
  items: Item[];
  releases: MomentInput[];
};

export default function PageIndex({ leaving, onLeave, items, releases }: PageIndexProps) {
  const newestRelease = releases.slice(-1)[0];
  const numberOfReleases = releases.length;
  // @ts-ignore
  const showChart = homepageContent === HomepageOption.chart || homepageContent === HomepageOption.both;
  // @ts-ignore
  const showColumns = homepageContent === HomepageOption.columns || homepageContent === HomepageOption.both;
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={radarNameShort} />
      <div className='headline-group'>
        <HeroHeadline alt={`Version #${numberOfReleases}`}>{radarName}</HeroHeadline>
      </div>
      {showChart && (
        <RadarGrid items={featuredOnly(items)} />
      )}
      {showColumns && (
        <QuadrantGrid items={featuredOnly(items)} />
      )}
      <div className='publish-date'>Published {formatRelease(newestRelease)}</div>
    </Fadeable>
  );
}
