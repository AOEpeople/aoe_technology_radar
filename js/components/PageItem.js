import React from 'react';
import HeroHeadline from './HeroHeadline';
import Badge from './Badge';
import ItemList from './ItemList';
import Link from './Link';
import Fadeable from './Fadeable';
import { createAnimation, createAnimationRunner } from '../animation';

import { groupByQuadrants } from '../../common/model';

const items = [1, 2]; // TODO use real items

const animationsIn = {
  background: createAnimation({
      transform: 'translateX(calc((100vw - 1200px) / 2 + 800px))',
      transition: 'transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)',
    }, {
      transition: 'transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)',
      transform: 'translateX(0)',
    },
    0
  ),
  navHeader: createAnimation({
      transform: 'translateX(-40px)',
      opacity: '0',
    }, {
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      transform: 'translateX(0px)',
      opacity: '1',
    },
    300
  ),
  text: createAnimation({
      transform: 'translateY(-20px)',
      opacity: '0',
    }, {
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      transform: 'translateY(0px)',
      opacity: '1',
    },
    600
  ),
  items: items.map((item, i) => (createAnimation({
      transform: 'translateX(-40px)',
      opacity: '0',
    }, {
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      transform: 'translateX(0px)',
      opacity: '1',
    },
    400 + 100 * i
  )))
};

const animationsOut = {
  background: createAnimation(
    animationsIn.background.stateB,
    animationsIn.background.stateA,
    0
  ),
  navHeader: createAnimation(
    animationsIn.navHeader.stateB,
    {
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      transform: 'translateX(40px)',
      opacity: '0',
    },
    0
  ),
  text: createAnimation(
    animationsIn.text.stateB,
    {
      transform: 'translateY(20px)',
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      opacity: '0',
    },
    0
  ),
  items: items.map((item, i) => (createAnimation(
    animationsIn.items[i].stateB,
    {
      transition: 'opacity 150ms ease-out, transform 300ms ease-out',
      transform: 'translateX(40px)',
      opacity: '0',
    },
    100 + 100 * i
  )))
};

const setAnimations = (state, animations) => ({
  ...state,
  animations,
});

class PageItem extends React.Component {
  constructor(props) {
    super(props);

    if (props.leaving) { // entering from an other page
      this.state = setAnimations({}, createAnimationRunner(animationsIn).getState());
    } else { // Hard refresh
      this.state = {};
    }
  }

  componentWillReceiveProps({ leaving }) {
    if (!this.props.leaving && leaving) { // page will be left
      this.animationRunner = createAnimationRunner(animationsOut, this.handleAnimationsUpdate);
      this.animationRunner.run();
      this.animationRunner.awaitAnimationComplete(this.props.onLeave);
    }
    if (this.props.leaving && !leaving) { // page is entered
      this.animationRunner = createAnimationRunner(animationsIn, this.handleAnimationsUpdate);
      this.animationRunner.run();
    }
  }

  handleTransitionEnd = () => {
    if (this.state.faded) {
      this.props.onLeave();
    }
  };

  handleAnimationsUpdate = () => {
    this.setState(setAnimations(this.state, this.animationRunner.getState()));
  };

  getAnimationState = (name) => {
    if (!this.state.animations) {
      return undefined;
    }
    return this.state.animations[name];
  };

  render() {
    const { leaving, onLeave, pageName, items } = this.props;
    const [quadrantName, itemName] = pageName.split('/');
    const item = items.filter(item => item.quadrant === quadrantName && item.name === itemName)[0];
    const itemsInRing = groupByQuadrants(items)[item.quadrant][item.ring];

    // console.log(this.getAnimationState('items'));

    return (
      <div>
        <div className="item-page">
          <div className="item-page__nav">
            <div className="item-page__nav__inner">
              <div className="item-page__header" style={this.getAnimationState('navHeader')}>
                <h3 className="headline">Languages &amp; Frameworks</h3>
              </div>

              <ItemList
                items={itemsInRing}
                activeItem={item}
                headerStyle={this.getAnimationState('navHeader')}
                itemStyle={this.getAnimationState('items')}
              >
                <div className="split">
                  <div className="split__left">
                    <Badge big type={item.ring}>{item.ring}</Badge>
                  </div>
                  <div className="split__right">
                    <Link className="icon-link" pageName={item.quadrant}>
                      <span className="icon icon--pie icon-link__icon"></span>Quadrant Overview
                    </Link>
                  </div>
                </div>
              </ItemList>
            </div>
          </div>
          <div className="item-page__content" style={this.getAnimationState('background')}>
            <div className="item-page__content__inner" style={this.getAnimationState('text')}>
              <div className="item-page__header">
                <div className="split">
                  <div className="split__left">
                    <h1 className="hero-headline hero-headline--inverse">{item.title}</h1>
                  </div>
                  <div className="split__right">
                    <Badge big type={item.ring}>{item.ring}</Badge>
                  </div>
                </div>
              </div>
              <div className="markdown" dangerouslySetInnerHTML={{__html: item.body}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageItem;
