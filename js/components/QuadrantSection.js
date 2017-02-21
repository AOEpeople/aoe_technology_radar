import React from 'react';
import { translate, rings } from '../../common/config';
import Badge from './Badge';
import Item from './Item';

const renderList = (ringName, quadrantName, groups, big) => {
  const itemsInRing = groups[quadrantName][ringName];

  if (big === true) {
    return (
      <div className="item-list">
        <div className="item-list__header">
          <Badge type={ringName} big={big}>{ringName}</Badge>
        </div>
        <div className="item-list__list">
          {
            itemsInRing.map(item => (
              <Item key={item.name} item={item} noLeadingBorder />
            ))
          }
        </div>
      </div>
    );
  }

  return (
    <div className="ring-list">
      <div className="ring-list__header">
        <Badge type={ringName}>{ringName}</Badge>
      </div>
      {
        itemsInRing.map(item => (
          <span
            key={item.name}
            className="ring-list__item"
          >
            <a className="link" href={`/${item.quadrant}/${item.name}.html`}>{item.title}</a>
          </span>
        ))
      }
    </div>
  );
}


const renderRing = (ringName, quadrantName, groups, big) => {
  if (!groups[quadrantName][ringName] || groups[quadrantName][ringName].length === 0) {
    return null;
  }
  return (
    <div key={ringName} className="quadrant-section__ring">
      {renderList(ringName, quadrantName, groups, big)}
    </div>
  );
}

export default function QuadrantSection({ quadrantName, groups, big = false }) {
  return (
    <div className="quadrant-section">
      <div className="quadrant-section__header">
        <div className="split">
          <div className="split__left">
            <h4 className="headline">{translate(quadrantName)}</h4>
          </div>
          {
            !big && (
              <div className="split__right">
                <a className="icon-link" href={`/${quadrantName}.html`}>
                  <span className="icon icon--pie icon-link__icon"></span>Quadrant Overview
                </a>
              </div>
            )
          }
        </div>
      </div>
      <div className="quadrant-section__rings">
        {
          rings.map((ringName) => renderRing(ringName, quadrantName, groups, big))
        }
      </div>
    </div>
  );
}
