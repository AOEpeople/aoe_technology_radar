import React from 'react';
import classNames from 'classnames';
import HeadlineGroup from './HeadlineGroup';
import HeroHeadline from './HeroHeadline';
import { groupByFirstLetter } from '../../common/model';
import { translate } from '../../common/config';

const rings = ['all', 'assess', 'trial', 'hold', 'adopt'];

class PageOverview extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      ring: rings[0],
    };
  }

  handleRingClick = (ring) => (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      ring,
    });
  }

  isRingActive(ringName) {
    return this.state.ring === ringName;
  }

  getFilteredAndGroupedItems() {
    const groups = groupByFirstLetter(this.props.items);
    const groupsFiltered = groups.map(group => ({
      ...group,
      items: group.items.filter(item => this.state.ring === 'all' || item.ring === this.state.ring),
    }));
    const nonEmptyGroups = groupsFiltered.filter(group => group.items.length > 0);
    return nonEmptyGroups;
  }

  render() {
    const groups = this.getFilteredAndGroupedItems();

    return (
      <div>
        <HeadlineGroup>
          <HeroHeadline>Technologies Overview</HeroHeadline>
        </HeadlineGroup>
        <div className="filter">
          <div className="nav">
            {
              rings.map(ringName => (
                <div className="nav__item" key={ringName}>
                  <a
                    className={classNames('badge badge--big', {
                      'badge--empty': !this.isRingActive(ringName),
                      [`badge--${ringName}`]: this.isRingActive(ringName),
                    })}
                    onClick={this.handleRingClick(ringName)}
                    href="#"
                  >
                    {ringName}
                  </a>
                </div>
              ))
            }
          </div>
        </div>

        <div className="letter-index">
          {
            groups.map(({ letter, items }) => (
              <div key={letter} className="letter-index__group">
                <div className="letter-index__letter">{letter}</div>
                <div className="letter-index__items">
                  <div className="item-list">
                    <div className="item-list__list">
                      {
                        items.map((item) => (
                          <a key={item.name} className="item item--big item--no-leading-border item--no-trailing-border" href="/platforms-and-aoe-services/bar.html">
                            <div className="split split--overview">
                              <div className="split__left">
                                <div className="item__title">{item.title}</div>
                              </div>
                              <div className="split__right">
                                <div className="nav">
                                  <div className="nav__item">{translate(item.quadrant)}</div>
                                  <div className="nav__item"><span className={`badge badge--${item.ring}`}>{item.ring}</span></div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    );
  }
}

export default PageOverview;
