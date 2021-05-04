import React, { useState, useEffect } from 'react';
import HeadlineGroup from '../HeadlineGroup/HeadlineGroup';
import HeroHeadline from '../HeroHeadline/HeroHeadline';
import Badge from '../Badge/Badge';
import Link from '../Link/Link';
import Search from '../Search/Search';
import Fadeable from '../Fadeable/Fadeable';
import SetTitle from '../SetTitle';
import Flag from '../Flag/Flag';
import { groupByFirstLetter, Item, Ring } from '../../model';
import { quadrantsMap } from '../../config';

const containsSearchTerm = (text = '', term = '') => {
  // TODO search refinement
  return text.trim().toLocaleLowerCase().indexOf(term.trim().toLocaleLowerCase()) !== -1;
};

type PageOverviewProps = {
  rings: readonly Ring[];
  search: string;
  items: Item[];
  leaving: boolean;
  onLeave: () => void;
};

export default function PageOverview({ rings, search: searchProp, items, leaving, onLeave }: PageOverviewProps) {
  const [selectedRing, setRing] = useState<Ring>(Ring.all);
  const [search, setSearch] = useState(searchProp);

  useEffect(() => {
    setSearch(searchProp);
  }, [rings, searchProp]);

  const handleRingClick = (ring: Ring) => () => {
    setRing(ring);
  };

  const isRingActive = (ring: Ring) => selectedRing === ring;

  const itemMatchesRing = (item: Item) => selectedRing === Ring.all || item.ring === selectedRing;

  const itemMatchesSearch = (item: Item) => {
    return search.trim() === '' || containsSearchTerm(item.title, search) || containsSearchTerm(item.body, search) || containsSearchTerm(item.info, search);
  };

  const isItemVisible = (item: Item) => itemMatchesRing(item) && itemMatchesSearch(item);

  const getFilteredAndGroupedItems = () => {
    const groups = groupByFirstLetter(items);
    const groupsFiltered = groups.map((group) => ({
      ...group,
      items: group.items.filter(isItemVisible),
    }));
    const nonEmptyGroups = groupsFiltered.filter((group) => group.items.length > 0);
    return nonEmptyGroups;
  };

  const handleSearchTermChange = setSearch;

  const groups = getFilteredAndGroupedItems();

  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title='Technologies Overview' />
      <HeadlineGroup>
        <HeroHeadline>Technologies Overview</HeroHeadline>
      </HeadlineGroup>
      <div className='filter'>
        <div className='split split--filter'>
          <div className='split__left'>
            <Search onChange={handleSearchTermChange} value={search} />
          </div>
          <div className='split__right'>
            <div className='nav'>
              {rings.map((ring) => (
                <div className='nav__item' key={ring}>
                  <Badge big onClick={handleRingClick(ring)} type={isRingActive(ring) ? ring : null}>
                    {Ring[ring]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='letter-index'>
        {groups.map(({ letter, items }) => (
          <div key={letter} className='letter-index__group'>
            <div className='letter-index__letter'>{letter}</div>
            <div className='letter-index__items'>
              <div className='item-list'>
                <div className='item-list__list'>
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      className='item item--big item--no-leading-border item--no-trailing-border'
                      pageName={`${item.quadrant}/${item.name}`}
                    >
                      <div className='split split--overview'>
                        <div className='split__left'>
                          <div className='item__title'>
                            {item.title}
                            <Flag item={item} />
                          </div>
                        </div>
                        <div className='split__right'>
                          <div className='nav nav--relations'>
                            <div className='nav__item'>{quadrantsMap.get(item.quadrant).displayName}</div>
                            <div className='nav__item'>
                              <Badge type={item.ring}>{Ring[item.ring]}</Badge>
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
