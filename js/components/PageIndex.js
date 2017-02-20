import React from 'react';
import HeroHeadline from './HeroHeadline';
import QuadrantGrid from './QuadrantGrid';

export default function PageIndex({ items }) {
  return (
    <div>
      <div className="headline-group">
        <HeroHeadline alt="Mar 2017">AOE Technology Radar</HeroHeadline>
      </div>
      <QuadrantGrid items={items} />
    </div>
  );
}
