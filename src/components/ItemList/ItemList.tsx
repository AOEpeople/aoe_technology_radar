import React from 'react';
import Item from '../Item/Item';
import { Item as mItem } from '../../model';
import './item-list.scss';
type ItemListProps = {
  items: mItem[];
  activeItem?: mItem;
  noLeadingBorder?: boolean;
  headerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties[];
};

export default function ItemList({ children, items, activeItem, noLeadingBorder, headerStyle = {}, itemStyle = [] }: React.PropsWithChildren<ItemListProps>) {
  return (
    <div className='item-list'>
      <div className='item-list__header' style={headerStyle}>
        {children}
      </div>
      <div className='item-list__list'>
        {items.map((item, i) => (
          <Item
            key={item.name}
            item={item}
            noLeadingBorder={noLeadingBorder}
            active={activeItem !== null && activeItem !== undefined && activeItem.name === item.name}
            style={itemStyle[i]}
          />
        ))}
      </div>
    </div>
  );
}
