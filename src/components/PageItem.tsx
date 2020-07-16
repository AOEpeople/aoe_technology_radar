import React, { useEffect, useState } from 'react';
import Badge from './Badge';
import ItemList from './ItemList';
import Link from './Link';
import FooterEnd from './FooterEnd';
import SetTitle from './SetTitle';
import ItemRevisions from './ItemRevisions';
import { createAnimation, createAnimationRunner } from '../animation';

import { translate } from '../config';
import { groupByQuadrants, Item } from '../model';

const getItem = (pageName: string, items: Item[]) => {
  const [quadrantName, itemName] = pageName.split('/');
  const item = items.filter(
    item => item.quadrant === quadrantName && item.name === itemName,
  )[0];
  return item;
};

const getItemsInRing = (pageName: string, items: Item[]) => {
  const item = getItem(pageName, items);
  const itemsInRing = groupByQuadrants(items)[item.quadrant][item.ring];
  return itemsInRing;
};

type PageItemProps = {
  pageName: string
  items: Item[]
  leaving: boolean
  onLeave: () => void
}

export default function PageItem({ pageName, items, leaving, onLeave }: PageItemProps) {
  const itemsInRing = getItemsInRing(pageName, items);

  const animationsIn = {
    background: createAnimation(
      {
        transform: 'translateX(calc((100vw - 1200px) / 2 + 800px))',
        transition: 'transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)',
      },
      {
        transition: 'transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)',
        transform: 'translateX(0)',
      },
      0,
    ),
    navHeader: createAnimation(
      {
        transform: 'translateX(-40px)',
        opacity: '0',
      },
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateX(0px)',
        opacity: '1',
      },
      300,
    ),
    text: createAnimation(
      {
        transform: 'translateY(-20px)',
        opacity: '0',
      },
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateY(0px)',
        opacity: '1',
      },
      600,
    ),
    items: itemsInRing.map((item, i) =>
      createAnimation(
        {
          transform: 'translateX(-40px)',
          opacity: '0',
        },
        {
          transition: 'opacity 150ms ease-out, transform 300ms ease-out',
          transform: 'translateX(0px)',
          opacity: '1',
        },
        400 + 100 * i,
      ),
    ),
    footer: createAnimation(
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateX(-40px)',
        opacity: '0',
      },
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateX(0px)',
        opacity: '1',
      },
      600 + itemsInRing.length * 100,
    ),
  };

  const animationsOut = {
    background: createAnimation(
      animationsIn.background.stateB,
      animationsIn.background.stateA,
      300 + itemsInRing.length * 50,
    ),
    navHeader: createAnimation(
      animationsIn.navHeader.stateB,
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateX(40px)',
        opacity: '0',
      },
      0,
    ),
    text: createAnimation(
      animationsIn.text.stateB,
      {
        transform: 'translateY(20px)',
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        opacity: '0',
      },
      0,
    ),
    items: itemsInRing.map((item, i) =>
      createAnimation(
        animationsIn.items[i].stateB,
        {
          transition: 'opacity 150ms ease-out, transform 300ms ease-out',
          transform: 'translateX(40px)',
          opacity: '0',
        },
        100 + 50 * i,
      ),
    ),
    footer: createAnimation(
      animationsIn.text.stateB,
      {
        transition: 'opacity 150ms ease-out, transform 300ms ease-out',
        transform: 'translateX(40px)',
        opacity: '0',
      },
      200 + itemsInRing.length * 50,
    ),
  };

  const [animations, setAnimations] = useState<any>();

  useEffect(()=>{
    if (leaving) {
      // entering from an other page
      // setAnimations(createAnimationRunner(animationsIn).getState())
    } else {
      // Hard refresh
      setAnimations(null)
    }
  }, [leaving])

  const [stateLeaving, setStateLeaving] = useState(leaving)

  let [animationRunner, setAnimationRunner] = useState<any>();

  // useEffect(() => {
  //   if (!stateLeaving && leaving) {
  //     animationRunner = createAnimationRunner(
  //       animationsOut,
  //       handleAnimationsUpdate,
  //     );
  //     setAnimationRunner(animationRunner)
  //     animationRunner.run();
  //     animationRunner.awaitAnimationComplete(onLeave);
  //   }
  //   if (stateLeaving && !leaving) {
  //     animationRunner = createAnimationRunner(
  //       animationsIn,
  //       handleAnimationsUpdate,
  //     );
  //     setAnimationRunner(animationRunner)
  //     animationRunner.run();
  //   }
  //   setStateLeaving(leaving)
  // }, [leaving])

  const handleAnimationsUpdate = () => {
    setAnimations(animationRunner.getState());
  };

  const getAnimationState = (name: string) => {
    if (!animations) {
      return undefined;
    }
    return animations[name];
  };

  const item = getItem(pageName, items);

  return (
    <div>
      <SetTitle title={item.title} />
      <div className="item-page">
        <div className="item-page__nav">
          <div className="item-page__nav__inner">
            <div
              className="item-page__header"
              style={getAnimationState('navHeader')}
            >
              <h3 className="headline">{translate(item.quadrant)}</h3>
            </div>

            <ItemList
              items={itemsInRing}
              activeItem={item}
              headerStyle={getAnimationState('navHeader')}
              itemStyle={getAnimationState('items')}
            >
              <div className="split">
                <div className="split__left">
                  <Badge big type={item.ring}>
                    {item.ring}
                  </Badge>
                </div>
                <div className="split__right">
                  <Link className="icon-link" pageName={item.quadrant}>
                    <span className="icon icon--pie icon-link__icon" />Quadrant
                      Overview
                    </Link>
                </div>
              </div>
            </ItemList>
            <div
              className="item-page__footer"
              style={getAnimationState('footer')}
            >
              <FooterEnd modifier="in-sidebar" />
            </div>
          </div>
        </div>
        <div
          className="item-page__content"
          style={getAnimationState('background')}
        >
          <div
            className="item-page__content__inner"
            style={getAnimationState('text')}
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
    </div>
  );
}
