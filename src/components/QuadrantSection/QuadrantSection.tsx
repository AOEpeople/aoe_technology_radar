import React from 'react';
import { quadrantsMap, showEmptyRings } from '../../config';
import Badge from '../Badge/Badge';
import Link from '../Link/Link';
import IconLink from '../IconLink/IconLink';
import ItemList from '../ItemList/ItemList';
import Flag from '../Flag/Flag';
import { Group, Ring } from '../../model';
import './quadrant-section.scss';
const renderList = (ring: Ring, quadrantName: string, groups: Group, big: boolean) => {
  const itemsInRing = groups[quadrantName][ring] || [];

  if (big) {
    return (
      <ItemList items={itemsInRing} noLeadingBorder>
        <Badge type={ring} big={big}>
          {Ring[ring]}
        </Badge>
      </ItemList>
    );
  }

  return (
    <div className='ring-list'>
      <div className='ring-list__header'>
        <Badge type={ring}>{Ring[ring]}</Badge>
      </div>
      {itemsInRing.map((item) => (
        <span key={item.name} className='ring-list__item'>
          <Link className='link' pageName={`${item.quadrant}/${item.name}`}>
            {item.title}
            <Flag item={item} short />
          </Link>
        </span>
      ))}
    </div>
  );
};

const renderRing = (ring: Ring, quadrantName: string, groups: Group, big: boolean) => {
  if (!showEmptyRings && (!groups[quadrantName] || !groups[quadrantName][ring] || groups[quadrantName][ring].length === 0)) {
    return null;
  }
  return (
    <div key={ring} className='quadrant-section__ring'>
      {renderList(ring, quadrantName, groups, big)}
    </div>
  );
};

export default function QuadrantSection({ quadrantName, groups, big = false, showTitle = true}: { quadrantName: string; groups: Group; big?: boolean; showTitle?: boolean }) {
  return (
    <div className='quadrant-section'>
      <div className='quadrant-section__header'>
        <div className='split'>
          {showTitle && (
            <div className="split__left">
              <h4 className="headline">{quadrantsMap.get(quadrantName).displayName}</h4>
            </div>
          )}
          {!big && (
            <div className='split__right'>
              <IconLink pageName={quadrantName} icon="pie" text="Zoom In" />
            </div>
          )}
        </div>
      </div>
      <div className='quadrant-section__rings'>{[Ring.adopt, Ring.trial, Ring.assess, Ring.hold].map((ring) => renderRing(ring, quadrantName, groups, big))}</div>
    </div>
  );
}
