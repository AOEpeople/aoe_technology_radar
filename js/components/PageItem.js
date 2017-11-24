import React from 'react';
import Badge from './Badge';
import ItemList from './ItemList';
import Link from './Link';
import FooterEnd from './FooterEnd';
import SetTitle from './SetTitle';
import ItemRevisions from './ItemRevisions';
import { createAnimation, createAnimationRunner } from '../animation';

import { translate } from '../../common/config';
import { groupByQuadrants } from '../../common/model';

const setAnimations = (state, animations) => ({
  ...state,
  animations,
});

class PageItem extends React.Component {
  constructor(props) {
    super(props);

    const itemsInRing = this.getItemsInRing(props);

    this.animationsIn = {
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

    this.animationsOut = {
      background: createAnimation(
        this.animationsIn.background.stateB,
        this.animationsIn.background.stateA,
        300 + itemsInRing.length * 50,
      ),
      navHeader: createAnimation(
        this.animationsIn.navHeader.stateB,
        {
          transition: 'opacity 150ms ease-out, transform 300ms ease-out',
          transform: 'translateX(40px)',
          opacity: '0',
        },
        0,
      ),
      text: createAnimation(
        this.animationsIn.text.stateB,
        {
          transform: 'translateY(20px)',
          transition: 'opacity 150ms ease-out, transform 300ms ease-out',
          opacity: '0',
        },
        0,
      ),
      items: itemsInRing.map((item, i) =>
        createAnimation(
          this.animationsIn.items[i].stateB,
          {
            transition: 'opacity 150ms ease-out, transform 300ms ease-out',
            transform: 'translateX(40px)',
            opacity: '0',
          },
          100 + 50 * i,
        ),
      ),
      footer: createAnimation(
        this.animationsIn.text.stateB,
        {
          transition: 'opacity 150ms ease-out, transform 300ms ease-out',
          transform: 'translateX(40px)',
          opacity: '0',
        },
        200 + itemsInRing.length * 50,
      ),
    };

    if (props.leaving) {
      // entering from an other page
      this.state = setAnimations(
        {},
        createAnimationRunner(this.animationsIn).getState(),
      );
    } else {
      // Hard refresh
      this.state = {};
    }
  }

  componentWillReceiveProps({ leaving }) {
    if (!this.props.leaving && leaving) {
      // page will be left
      this.animationRunner = createAnimationRunner(
        this.animationsOut,
        this.handleAnimationsUpdate,
      );
      this.animationRunner.run();
      this.animationRunner.awaitAnimationComplete(this.props.onLeave);
    }
    if (this.props.leaving && !leaving) {
      // page is entered
      this.animationRunner = createAnimationRunner(
        this.animationsIn,
        this.handleAnimationsUpdate,
      );
      this.animationRunner.run();
    }
  }

  handleAnimationsUpdate = () => {
    this.setState(setAnimations(this.state, this.animationRunner.getState()));
  };

  getAnimationState = name => {
    if (!this.state.animations) {
      return undefined;
    }
    return this.state.animations[name];
  };

  getItem = props => {
    const [quadrantName, itemName] = props.pageName.split('/');
    const item = props.items.filter(
      item => item.quadrant === quadrantName && item.name === itemName,
    )[0];
    return item;
  };

  getItemsInRing = props => {
    const item = this.getItem(props);
    const itemsInRing = groupByQuadrants(props.items)[item.quadrant][item.ring];
    return itemsInRing;
  };

  render() {
    const item = this.getItem(this.props);
    const itemsInRing = this.getItemsInRing(this.props);
    return (
      <div>
        <SetTitle {...this.props} title={item.title} />
        <div className="item-page">
          <div className="item-page__nav">
            <div className="item-page__nav__inner">
              <div
                className="item-page__header"
                style={this.getAnimationState('navHeader')}
              >
                <h3 className="headline">{translate(item.quadrant)}</h3>
              </div>

              <ItemList
                items={itemsInRing}
                activeItem={item}
                headerStyle={this.getAnimationState('navHeader')}
                itemStyle={this.getAnimationState('items')}
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
                style={this.getAnimationState('footer')}
              >
                <FooterEnd modifier="in-sidebar" />
              </div>
            </div>
          </div>
          <div
            className="item-page__content"
            style={this.getAnimationState('background')}
          >
            <div
              className="item-page__content__inner"
              style={this.getAnimationState('text')}
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
}

export default PageItem;
