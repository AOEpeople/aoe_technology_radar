import React from 'react';
import Badge from '../Badge/Badge';
import ItemList from '../ItemList/ItemList';
import Link from '../Link/Link';
import Fadeable from '../Fadeable/Fadeable';
import SetTitle from '../SetTitle';
import ItemRevisions from '../ItemRevisions/ItemRevisions';

import { translate } from '../../config';
import { groupByQuadrants, Item } from '../../model';

type PageItemMobileProps = {
  pageName: string;
  items: Item[];
  leaving: boolean;
  onLeave: () => void;
};

export default function PageItemMobile({ pageName, items, leaving, onLeave }: PageItemMobileProps) {
  const getItem = (pageName: string, items: Item[]) => {
    const [quadrantName, itemName] = pageName.split('/');
    const item = items.filter((item) => item.quadrant === quadrantName && item.name === itemName)[0];
    return item;
  };

  const getItemsInRing = (pageName: string, items: Item[]) => {
    const item = getItem(pageName, items);
    const itemsInRing = groupByQuadrants(items)[item.quadrant][item.ring];
    return itemsInRing;
  };

  const item = getItem(pageName, items);
  const itemsInRing = getItemsInRing(pageName, items);
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={item.title} />
      <div className='mobile-item-page'>
        <div className='mobile-item-page__content'>
          <div className='mobile-item-page__content__inner'>
            <div className='mobile-item-page__header'>
              <div className='split'>
                <div className='split__left'>
                  <h3 className='headline'>{translate(item.quadrant)}</h3>
                  <h1 className='hero-headline hero-headline--inverse'>{item.title}</h1>
                </div>
                <div className='split__right'>
                  <Badge big type={item.ring}>
                    {item.ring}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='markdown' dangerouslySetInnerHTML={{ __html: item.body }} />
            {item.revisions.length > 1 && <ItemRevisions revisions={item.revisions.slice(1)} />}
          </div>
        </div>
      </div>
      <aside className='mobile-item-page__aside'>
        <ItemList items={itemsInRing} activeItem={item}>
          <div className='split'>
            <div className='split__left'>
              <h3 className='headline'>{translate(item.quadrant)}</h3>
            </div>
            <div className='split__right'>
              <Link className='icon-link' pageName={item.quadrant}>
                <span className='icon icon--pie icon-link__icon'></span>Zoom In
              </Link>
            </div>
          </div>
        </ItemList>
      </aside>
    </Fadeable>
  );
}
