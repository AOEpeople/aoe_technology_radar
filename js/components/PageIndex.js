import React from 'react';
import HeroHeadline from './HeroHeadline';
import QuadrantGrid from './QuadrantGrid';
import Fadeable from './Fadeable';

export default function PageIndex({ leaving, onLeave, items, navigate }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <div className="headline-group">
        <HeroHeadline alt="Mar 2017">AOE Technology Radar</HeroHeadline>
      </div>
      <QuadrantGrid items={items} />
    </Fadeable>
  );
}
