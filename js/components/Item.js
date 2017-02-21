import React from 'react';
import classNames from 'classnames';

export default function Item({ item, noLeadingBorder = false}) {
  return (
    <a
      className={classNames('item', {
        'item--no-leading-border': noLeadingBorder,
      })}
      href={`/${item.quadrant}/${item.name}.html`}
    >
      <div className="item__title">{item.title}</div>
      {
        item.info && (
          <div className="item__info">{item.info}</div>
        )
      }
    </a>
  );
}
