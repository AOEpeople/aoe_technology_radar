import React from "react";
import Badge from "../Badge/Badge";
import ItemList from "../ItemList/ItemList";
import Link from "../Link/Link";
import FooterEnd from "../FooterEnd/FooterEnd";
import SetTitle from "../SetTitle";
import ItemRevisions from "../ItemRevisions/ItemRevisions";
import { useAnimations } from "./useAnimations";
import "./item-page.scss";
import { translate } from "../../config";
import {
  featuredOnly,
  nonFeaturedOnly,
  groupByQuadrants,
  Item,
} from "../../model";

const getItem = (pageName: string, items: Item[]) => {
  const [quadrantName, itemName] = pageName.split("/");
  return items.filter(
    (item) => item.quadrant === quadrantName && item.name === itemName
  )[0];
};

const getItemsInRing = (pageName: string, items: Item[]) => {
  const item = getItem(pageName, items);
  return groupByQuadrants(items)[item.quadrant][item.ring];
};

type Props = {
  pageName: string;
  items: Item[];
  leaving: boolean;
  onLeave: () => void;
};

const PageItem: React.FC<Props> = ({ pageName, items, leaving, onLeave }) => {
  const itemsInRing = getItemsInRing(pageName, items);
  const featuredItemsInRing = featuredOnly(itemsInRing);
  const nonFeaturedItemsInRing = nonFeaturedOnly(itemsInRing);

  const { getAnimationState, getAnimationStates } = useAnimations({
    itemsInRing,
    featuredItemsInRing,
    nonFeaturedItemsInRing,
    onLeave,
    leaving,
  });

  const item = getItem(pageName, items);

  return (
    <>
      <SetTitle title={item.title} />
      <div className="item-page">
        <div className="item-page__nav">
          <div className="item-page__nav__inner">
            <div
              className="item-page__header"
              style={getAnimationState("navHeader")}
            >
              <h3 className="headline">{translate(item.quadrant)}</h3>
            </div>
            <ItemList
              items={featuredItemsInRing}
              activeItem={item}
              headerStyle={getAnimationState("navHeader")}
              itemStyle={getAnimationStates("featuredItems")}
            >
              <div className="split">
                <div className="split__left">
                  <Badge big type={item.ring}>
                    {item.ring}
                  </Badge>
                </div>
                <div className="split__right">
                  <Link className="icon-link" pageName={item.quadrant}>
                    <span className="icon icon--pie icon-link__icon" />
                    Quadrant Overview
                  </Link>
                </div>
              </div>
            </ItemList>

            {nonFeaturedItemsInRing.length > 0 && (
              <div className="item-page__non-featured-items">
                <ItemList
                  items={nonFeaturedItemsInRing}
                  activeItem={item}
                  headerStyle={getAnimationState("nonFeaturedItems")}
                  itemStyle={getAnimationStates("nonFeaturedItems")}
                  greyedOut={true}
                >
                  <div className="split">
                    <div className="split__left">
                      <h4 className="headline">Not featured anymore</h4>
                    </div>
                  </div>
                </ItemList>
              </div>
            )}

            <div
              className="item-page__footer"
              style={getAnimationState("footer")}
            >
              <FooterEnd modifier="in-sidebar" />
            </div>
          </div>
        </div>
        <div
          className="item-page__content"
          style={getAnimationState("background")}
        >
          <div
            className="item-page__content__inner"
            style={getAnimationState("text")}
          >
            <div className="item-page__header">
              <div className="split">
                <div className="split__left">
                  <h1 className="hero-headline hero-headline--inverse">
                    {item.title}
                  </h1>
                </div>
                <div className="split__right">
                  <Badge big type={item.ring}>
                    {item.ring}
                  </Badge>
                </div>
              </div>
            </div>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
            {item.revisions.length > 1 && (
              <ItemRevisions revisions={item.revisions.slice(1)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageItem;
