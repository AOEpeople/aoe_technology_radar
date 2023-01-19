import { useEffect, useState } from "react";

import { ConfigData, translate } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { Item, groupByFirstLetter } from "../../model";
import Badge from "../Badge/Badge";
import Fadeable from "../Fadeable/Fadeable";
import Flag from "../Flag/Flag";
import HeadlineGroup from "../HeadlineGroup/HeadlineGroup";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import Link from "../Link/Link";
import Search from "../Search/Search";
import SetTitle from "../SetTitle";

const containsSearchTerm = (text = "", term = "") => {
  // TODO search refinement
  return (
    text.trim().toLocaleLowerCase().indexOf(term.trim().toLocaleLowerCase()) !==
    -1
  );
};

type PageOverviewProps = {
  rings: readonly ("all" | string)[];
  search: string;
  items: Item[];
  config: ConfigData;
  leaving: boolean;
  onLeave: () => void;
};

export default function PageOverview({
  rings,
  search: searchProp,
  items,
  config,
  leaving,
  onLeave,
}: PageOverviewProps) {
  const [ring, setRing] = useState<string | "all">("all");
  const [search, setSearch] = useState(searchProp);
  const { pageOverview } = useMessages();
  const title = pageOverview?.title || "Technologies Overview";

  useEffect(() => {
    setSearch(searchProp);
  }, [searchProp]);

  const handleRingClick = (ring: string) => () => {
    setRing(ring);
  };

  const isRingActive = (ringName: string) => ring === ringName;

  const itemMatchesRing = (item: Item) => ring === "all" || item.ring === ring;

  const itemMatchesSearch = (item: Item) => {
    return (
      search.trim() === "" ||
      containsSearchTerm(item.title, search) ||
      containsSearchTerm(item.body, search) ||
      containsSearchTerm(item.info, search)
    );
  };

  const isItemVisible = (item: Item) =>
    itemMatchesRing(item) && itemMatchesSearch(item);

  const getFilteredAndGroupedItems = () => {
    const groups = groupByFirstLetter(items);
    const groupsFiltered = groups.map((group) => ({
      ...group,
      items: group.items.filter(isItemVisible),
    }));
    const nonEmptyGroups = groupsFiltered.filter(
      (group) => group.items.length > 0
    );
    return nonEmptyGroups;
  };

  const handleSearchTermChange = setSearch;

  const groups = getFilteredAndGroupedItems();

  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={title} />
      <HeadlineGroup>
        <HeroHeadline>{title}</HeroHeadline>
      </HeadlineGroup>
      <div className="filter">
        <div className="split split--filter">
          <div className="split__left">
            <Search onChange={handleSearchTermChange} value={search} />
          </div>
          <div className="split__right">
            <div className="nav">
              {["all", ...rings].map((ringName) => (
                <div className="nav__item" key={ringName}>
                  <Badge
                    big
                    onClick={handleRingClick(ringName)}
                    type={isRingActive(ringName) ? ringName : "empty"}
                    config={config}
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
                  {items.map((item) => (
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
                              {translate(config, item.quadrant)}
                            </div>
                            <div className="nav__item">
                              <Badge type={item.ring} config={config}>
                                {item.ring}
                              </Badge>
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
