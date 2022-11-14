import React from "react";

import { ConfigData, translate } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { Item, groupByQuadrants } from "../../model";
import Badge from "../Badge/Badge";
import EditButton from "../EditButton/EditButton";
import FooterEnd from "../FooterEnd/FooterEnd";
import ItemList from "../ItemList/ItemList";
import ItemRevisions from "../ItemRevisions/ItemRevisions";
import ItemTags from "../ItemTags/ItemTags";
import Link from "../Link/Link";
import SetTitle from "../SetTitle";
import "./item-page.scss";
import { useAnimations } from "./useAnimations";

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
  config: ConfigData;
  leaving: boolean;
  onLeave: () => void;
};

const PageItem: React.FC<Props> = ({
  pageName,
  items,
  config,
  leaving,
  onLeave,
}) => {
  const { pageItem } = useMessages();
  const quadrantOverview = pageItem?.quadrantOverview || "Quadrant Overview";

  const itemsInRing = getItemsInRing(pageName, items);

  const { getAnimationState, getAnimationStates } = useAnimations({
    itemsInRing,
    onLeave,
    leaving,
  });

  const item = getItem(pageName, items);
  const editButton = config.editLink ? (
    <EditButton
      baseUrl={config.editLink.radarLink}
      item={item}
      title={config.editLink.title}
    />
  ) : null;

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
              <h3 className="headline">{translate(config, item.quadrant)}</h3>
            </div>
            <ItemList
              items={itemsInRing}
              activeItem={item}
              headerStyle={getAnimationState("navHeader")}
              itemStyle={getAnimationStates("items")}
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
                    {quadrantOverview}
                  </Link>
                </div>
              </div>
            </ItemList>

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
                <div className="split__left hero-headline__wrapper">
                  <h1 className="hero-headline hero-headline--inverse">
                    {item.title}
                  </h1>
                  {editButton}
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
            <ItemTags tags={item.tags} />
            {item.revisions.length > 1 && (
              <ItemRevisions
                revisions={item.revisions.slice(1)}
                dateFormat={config.dateFormat}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageItem;
