import React from 'react';
import HeroHeadline from '../HeroHeadline/HeroHeadline';
import HeadlineGroup from '../HeadlineGroup/HeadlineGroup';
import QuadrantSection from '../QuadrantSection/QuadrantSection';
import Fadeable from '../Fadeable/Fadeable';
import SetTitle from '../SetTitle';

import { translate } from '../../config';
import { featuredOnly, groupByQuadrants, Item } from '../../model';

type PageQuadrantProps = {
  leaving: boolean;
  onLeave: () => void;
  pageName: string;
  items: Item[];
};

export default function PageQuadrant({ leaving, onLeave, pageName, items }: PageQuadrantProps) {
  const groups = groupByQuadrants(featuredOnly(items));
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={translate(pageName)} />
      <HeadlineGroup>
        <HeroHeadline>{translate(pageName)}</HeroHeadline>
      </HeadlineGroup>
      <QuadrantSection groups={groups} quadrantName={pageName} big />
    </Fadeable>
  );
}
