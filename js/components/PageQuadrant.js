import React from 'react';
import HeroHeadline from './HeroHeadline';
import HeadlineGroup from './HeadlineGroup';
import QuadrantSection from './QuadrantSection';
import Fadeable from './Fadeable';

import { translate } from '../../common/config';
import { groupByQuadrants } from '../../common/model';

export default function PageQuadrant({ leaving, onLeave, pageName, items }) {
  const groups = groupByQuadrants(items);
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <HeadlineGroup>
        <HeroHeadline>{translate(pageName)}</HeroHeadline>
      </HeadlineGroup>
      <QuadrantSection groups={groups} quadrantName={pageName} big />
    </Fadeable>
  );
}
