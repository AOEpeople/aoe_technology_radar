import React from 'react';
import HeroHeadline from './HeroHeadline';
import HeadlineGroup from './HeadlineGroup';
import QuadrantSection from './QuadrantSection';
import { translate } from '../../common/config';
import { groupByQuadrants } from '../../common/model';

export default function PageQuadrant({ pageName, items }) {
  const groups = groupByQuadrants(items);
  return (
    <div>
      <HeadlineGroup>
        <HeroHeadline>{translate(pageName)}</HeroHeadline>
      </HeadlineGroup>
      <QuadrantSection groups={groups} quadrantName={pageName} big />
    </div>
  );
}
