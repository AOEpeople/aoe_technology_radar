import React from 'react';
import HeroHeadline from './HeroHeadline';

export default function PageItems({ pageName, items }) {
  const [quadrantName, itemName] = pageName.split('/');
  const item = items.filter(item => item.quadrant === quadrantName && item.name === itemName)[0];
  return (
    <div>
      <HeroHeadline>{item.title}</HeroHeadline>
    </div>
  );
}
