import React from 'react';
import Item from './Item';

export default function ItemList({ children, items, activeItem, noLeadingBorder }) {
  return (
    <div className="item-list">
      <div className="item-list__header">
        {children}
      </div>
      <div className="item-list__list">
        {
          items.map(item => (
            <Item
              key={item.name}
              item={item}
              noLeadingBorder={noLeadingBorder}
              active={typeof activeItem === 'object' && activeItem !== null && activeItem.name === item.name}
            />
          ))
        }
      </div>
    </div>
  );
}
