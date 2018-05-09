import React from 'react';
import HeroHeadline from './HeroHeadline';
import HeadlineGroup from './HeadlineGroup';
import QuadrantSection from './QuadrantSection';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

import { translate } from '../../common/config';
import {featuredOnly, groupByQuadrants} from '../../common/model';

export default function PageQuadrant({ leaving, onLeave, pageName, items, ...props }) {
  const groups = groupByQuadrants(featuredOnly(items));
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title={translate(pageName)} />
      <HeadlineGroup>
        <HeroHeadline>{translate(pageName)}</HeroHeadline>
      </HeadlineGroup>
      <QuadrantSection groups={groups} quadrantName={pageName} big />
    </Fadeable>
  );
}
