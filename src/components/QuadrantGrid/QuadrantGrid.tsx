import React from 'react';
import { groupByQuadrants, Item, Group } from '../../model';
import { quadrantsMap } from '../../config';
import QuadrantSection from '../QuadrantSection/QuadrantSection';
import './quadrant-grid.scss';
const renderQuadrant = (quadrantName: string, groups: Group) => {
  return (
    <div key={quadrantName} className='quadrant-grid__quadrant'>
      <QuadrantSection quadrantName={quadrantName} groups={groups} />
    </div>
  );
};

export default function QuadrantGrid({ items }: { items: Item[] }) {
  const groups = groupByQuadrants(items);
  return <div className='quadrant-grid'>{[...quadrantsMap.keys()].map((quadrantName) => renderQuadrant(quadrantName, groups))}</div>;
}
