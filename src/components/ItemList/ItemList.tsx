import React from "react";

import { featuredOnly, Item as mItem, nonFeaturedOnly } from "../../model";
import Item from "../Item/Item";
import "./item-list.scss";

type ItemListProps = {
  items: mItem[];
  activeItem?: mItem;
  noLeadingBorder?: boolean;
  headerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties[];
};

const ItemList: React.FC<React.PropsWithChildren<ItemListProps>> = ({
  children,
  items,
  activeItem,
  noLeadingBorder,
  headerStyle = {},
  itemStyle = [],
}) => {
  const featuredItems = featuredOnly(items);
  const nonFeaturedItems = nonFeaturedOnly(items);

  return (
    <div className="item-list">
      <div className="item-list__header" style={headerStyle}>
        {children}
      </div>
      <div className="item-list__list">
        {featuredItems.map((item, i) => (
          <Item
            key={item.name}
            item={item}
            noLeadingBorder={noLeadingBorder}
            active={activeItem?.name === item.name}
            style={itemStyle[i]}
            greyedOut={false}
          />
        ))}
        {nonFeaturedItems.map((item, i) => (
          <Item
            key={item.name}
            item={item}
            noLeadingBorder={noLeadingBorder}
            active={activeItem?.name === item.name}
            style={itemStyle[featuredItems.length + i]}
            greyedOut={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
