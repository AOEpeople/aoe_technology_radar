import React from "react";
import Item from "../Item/Item";
import { Item as mItem } from "../../model";
import "./item-list.scss";

type ItemListProps = {
  items: mItem[];
  activeItem?: mItem;
  noLeadingBorder?: boolean;
  headerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties[];
  greyedOut?: boolean;
};

const ItemList: React.FC<ItemListProps> = ({
  children,
  items,
  activeItem,
  noLeadingBorder,
  headerStyle = {},
  itemStyle = [],
  greyedOut = false,
}) => (
  <div className="item-list">
    <div className="item-list__header" style={headerStyle}>
      {children}
    </div>
    <div className="item-list__list">
      {items.map((item, i) => (
        <Item
          key={item.name}
          item={item}
          noLeadingBorder={noLeadingBorder}
          active={activeItem?.name === item.name}
          style={itemStyle[i]}
          greyedOut={greyedOut}
        />
      ))}
    </div>
  </div>
);

export default ItemList;
