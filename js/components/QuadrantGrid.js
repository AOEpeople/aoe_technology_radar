import React from 'react';
import { groupByQuadrants } from '../../common/model';
import { translate, quadrants, rings } from '../../common/config';

const renderRing = (ringName, quadrantName, groups) => {
  if (!groups[quadrantName][ringName] || groups[quadrantName][ringName].length === 0) {
    return null;
  }
  return (
    <div className="quadrant-section__ring">
      <div className="ring-list">
        <div className="ring-list__header"><span className={`badge badge--${ringName}`}>{ringName}</span></div>
        {
          (groups[quadrantName][ringName]).map(item => (
            <span
              key={item.name}
              className="ring-list__item"
            >
              <a className="link" href={`/${item.quadrant}/${item.name}.html`}>{item.title}</a>
            </span>
          ))
        }
      </div>
    </div>
  );
}

const renderQuadrant = (quadrantName, groups) => {
  return (
    <div key={quadrantName} className="quadrant-grid__quadrant">
      <div className="quadrant-section">
        <div className="quadrant-section__header">
          <div className="split">
            <div className="split__left">
              <h4 className="headline">{translate(quadrantName)}</h4>
            </div>
            <div className="split__right">
              <a className="icon-link" href={`/${quadrantName}.html`}>
                <span className="icon icon--pie icon-link__icon"></span>Quadrant Overview
              </a>
            </div>
          </div>
        </div>
        <div className="quadrant-section__rings">
          {
            rings.map((ringName) => renderRing(ringName, quadrantName, groups))
          }
        </div>
      </div>
    </div>
  );
}

export default function({ items }) {
  const groups = groupByQuadrants(items);
  return (
    <div className="quadrant-grid">
      {
        quadrants.map((quadrantName) => renderQuadrant(quadrantName, groups))
      }
    </div>
  );
}
