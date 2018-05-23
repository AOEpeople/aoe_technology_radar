import React from 'react';
import classNames from 'classnames';
import Link from './Link';
import Flag from './Flag';

export default function Item({
  item,
  noLeadingBorder = false,
  active = false,
  style = {},
}) {
  return (
    <Link
      className={classNames('item', {
        'item--no-leading-border': noLeadingBorder,
        'is-active': active,
      })}
      pageName={`${item.quadrant}/${item.name}`}
      style={style}
    >
      <div className="item__title">
        {item.title}
        <Flag item={item} />
      </div>
      {item.info && <div className="item__info">{item.info}</div>}
    </Link>
  );
}
