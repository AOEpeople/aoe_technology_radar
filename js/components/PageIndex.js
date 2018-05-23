import React from 'react';
import { formatRelease } from '../date';

import { featuredOnly } from '../../common/model';
import HeroHeadline from './HeroHeadline';
import QuadrantGrid from './QuadrantGrid';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

export default function PageIndex({
  leaving,
  onLeave,
  items,
  navigate,
  ...props
}) {
  const newestRelease = props.releases.slice(-1)[0];
  const numberOfReleases = props.releases.length;
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="Technology Radar" />
      <div className="headline-group">
        <HeroHeadline alt={`Version #${numberOfReleases}`}>
          AOE Technology Radar
        </HeroHeadline>
      </div>
      <QuadrantGrid items={featuredOnly(items)} />
      <div className="publish-date">
          Published {formatRelease(newestRelease)}
      </div>
    </Fadeable>
  );
}
