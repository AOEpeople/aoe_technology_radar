import React from 'react';
import HeroHeadline from './HeroHeadline';
import Badge from './Badge';
import ItemList from './ItemList';
import Link from './Link';
import { groupByQuadrants } from '../../common/model';

export default function PageItems({ pageName, items }) {
  const [quadrantName, itemName] = pageName.split('/');
  const item = items.filter(item => item.quadrant === quadrantName && item.name === itemName)[0];
  const itemsInRing = groupByQuadrants(items)[item.quadrant][item.ring];

  return (
    <div className="item-page">
      <div className="item-page__nav">
        <div className="item-page__nav__inner">
          <div className="item-page__header">
            <h3 className="headline">Languages &amp; Frameworks</h3>
          </div>
          <ItemList items={itemsInRing} activeItem={item}>
            <div className="split">
              <div className="split__left">
                <Badge big type={item.ring}>{item.ring}</Badge>
              </div>
              <div className="split__right">
                <Link className="icon-link" pageName={item.quadrant}>
                  <span className="icon icon--pie icon-link__icon"></span>Quadrant Overview
                </Link>
              </div>
            </div>
          </ItemList>
        </div>
      </div>
      <div className="item-page__content">
        <div className="item-page__content__inner">
          <div className="item-page__header">
            <div className="split">
              <div className="split__left">
                <h1 className="hero-headline hero-headline--inverse">{item.title}</h1>
              </div>
              <div className="split__right">
                <Badge big type={item.ring}>{item.ring}</Badge>
              </div>
            </div>
          </div>
          <div className="markdown" dangerouslySetInnerHTML={{__html: item.body}} />
        </div>
      </div>
    </div>
  );
}
