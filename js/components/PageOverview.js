import React from 'react';
import HeadlineGroup from './HeadlineGroup';
import HeroHeadline from './HeroHeadline';
import Badge from './Badge';
import Link from './Link';
import Search from './Search';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';
import Flag from './Flag';
import { groupByFirstLetter } from '../../common/model';
import { translate } from '../../common/config';

const rings = ['all', 'assess', 'trial', 'hold', 'adopt'];

const containsSearchTerm = (text = '', term = '') => {
  // TODO search refinement
  return (
    text
      .trim()
      .toLocaleLowerCase()
      .indexOf(term.trim().toLocaleLowerCase()) !== -1
  );
};

class PageOverview extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      ring: rings[0],
      search: props.pageState.search || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.search !== nextProps.pageState.search) {
      this.setState({
        ring: rings[0],
        search: nextProps.pageState.search,
      });
    }
  }

  handleRingClick = ring => e => {
    e.preventDefault();

    this.setState({
      ring,
    });
  };

  isRingActive(ringName) {
    return this.state.ring === ringName;
  }

  itemMatchesRing = item => {
    return this.state.ring === 'all' || item.ring === this.state.ring;
  };

  itemMatchesSearch = item => {
    return (
      this.state.search.trim() === '' ||
      containsSearchTerm(item.title, this.state.search) ||
      containsSearchTerm(item.body, this.state.search) ||
      containsSearchTerm(item.info, this.state.search)
    );
  };

  isItemVisible = item => {
    return this.itemMatchesRing(item) && this.itemMatchesSearch(item);
  };

  getFilteredAndGroupedItems() {
    const groups = groupByFirstLetter(this.props.items);
    const groupsFiltered = groups.map(group => ({
      ...group,
      items: group.items.filter(this.isItemVisible),
    }));
    const nonEmptyGroups = groupsFiltered.filter(
      group => group.items.length > 0,
    );
    return nonEmptyGroups;
  }

  handleSearchTermChange = value => {
    this.setState({
      search: value,
    });
  };

  render() {
    const groups = this.getFilteredAndGroupedItems();

    return (
      <Fadeable leaving={this.props.leaving} onLeave={this.props.onLeave}>
        <SetTitle {...this.props} title="Technologies Overview" />
        <HeadlineGroup>
          <HeroHeadline>Technologies Overview</HeroHeadline>
        </HeadlineGroup>
        <div className="filter">
          <div className="split split--filter">
            <div className="split__left">
              <Search
                onChange={this.handleSearchTermChange}
                value={this.state.search}
              />
            </div>
            <div className="split__right">
              <div className="nav">
                {rings.map(ringName => (
                  <div className="nav__item" key={ringName}>
                    <Badge
                      big
                      onClick={this.handleRingClick(ringName)}
                      type={this.isRingActive(ringName) ? ringName : 'empty'}
                    >
                      {ringName}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="letter-index">
          {groups.map(({ letter, items }) => (
            <div key={letter} className="letter-index__group">
              <div className="letter-index__letter">{letter}</div>
              <div className="letter-index__items">
                <div className="item-list">
                  <div className="item-list__list">
                    {items.map(item => (
                      <Link
                        key={item.name}
                        className="item item--big item--no-leading-border item--no-trailing-border"
                        pageName={`${item.quadrant}/${item.name}`}
                      >
                        <div className="split split--overview">
                          <div className="split__left">
                            <div className="item__title">
                              {item.title}
                              <Flag item={item} />
                            </div>
                          </div>
                          <div className="split__right">
                            <div className="nav nav--relations">
                              <div className="nav__item">
                                {translate(item.quadrant)}
                              </div>
                              <div className="nav__item">
                                <Badge type={item.ring}>{item.ring}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fadeable>
    );
  }
}

export default PageOverview;
