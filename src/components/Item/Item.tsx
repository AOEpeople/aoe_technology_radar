import React from 'react';
import classNames from 'classnames';
import Link from '../Link/Link';
import Flag from '../Flag/Flag';
import { Item as mItem } from '../../model';
import './item.scss';
type ItemProps = {
  item: mItem;
  noLeadingBorder?: boolean;
  active?: boolean;
  style: React.CSSProperties;
};

export default function Item({ item, noLeadingBorder = false, active = false, style = {} }: ItemProps) {
  return (
    <Link
      className={classNames('item', {
        'item--no-leading-border': noLeadingBorder,
        'is-active': active,
      })}
      pageName={`${item.quadrant}/${item.name}`}
      style={style}
    >
      <div className='item__title'>
        {item.title}
        <Flag item={item} />
      </div>
      {item.info && <div className='item__info'>{item.info}</div>}
    </Link>
  );
}
