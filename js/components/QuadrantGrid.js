import React from 'react';
import { groupByQuadrants } from '../../common/model';
import { quadrants } from '../../common/config';
import QuadrantSection from './QuadrantSection';

const renderQuadrant = (quadrantName, groups) => {
  return (
    <div key={quadrantName} className="quadrant-grid__quadrant">
      <QuadrantSection quadrantName={quadrantName} groups={groups} />
    </div>
  );
}

export default function QuadrantGrid({ items }) {
  const groups = groupByQuadrants(items);
  return (
    <div className="quadrant-grid">
      {
        quadrants.map((quadrantName) => renderQuadrant(quadrantName, groups))
      }
    </div>
  );
}
