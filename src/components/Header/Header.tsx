import classNames from "classnames";
import qs from "query-string";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { radarNameShort } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { useSearchParamState } from "../../hooks/use-search-param-state";
import { Tag } from "../../model";
import Branding from "../Branding/Branding";
import Link from "../Link/Link";
import LogoLink from "../LogoLink/LogoLink";
import Search from "../Search/Search";
import TagsModal from "../TagsModal/TagsModal";

export default function Header({
  pageName,
  tags,
}: {
  pageName: string;
  tags: Tag[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchLabel, pageHelp, pageOverview } = useMessages();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParamState, setSearchParamsState] = useSearchParamState();

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    let { tags } = searchParamState;
    tags = Array.isArray(tags) ? tags.join("|") : tags;

    navigate({
      pathname: "/overview.html",
      search: qs.stringify({ search: search, tags }),
    });

    setSearchOpen(false);
    setSearch("");
  };

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault(); // todo used to be a link
    openSearch();
    setTimeout(() => {
      searchRef?.current?.focus();
    }, 0);
  };

  const handleTagChange = (tag: Tag) => {
    const { search, tags = [] } = searchParamState;
    let newTags;

    // Toggle changed item in tags searchParam depends on type Array or String
    if (Array.isArray(tags)) {
      newTags = tags.includes(tag)
        ? tags.filter((item: string) => item !== tag)
        : [...tags, tag];
    } else {
      newTags = tags !== tag ? [tags, tag] : [];
    }

    setSearchParamsState({
      tags: newTags,
      search,
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = function () {
    setModalIsOpen(!modalIsOpen);
  };

  const smallLogo = pageName !== "index";

  return (
    <Branding logoContent={<LogoLink small={smallLogo} />}>
      <div className="nav">
        {pageHelp && (
          <div className="nav__item">
            <Link pageName="help-and-about-tech-radar" className="icon-link">
              <span className="icon icon--question icon-link__icon" />
              {pageHelp.headlinePrefix || "How to use"} {radarNameShort}?
            </Link>
          </div>
        )}
        {Boolean(tags.length) && (
          <div className="nav__item">
            <button className="icon-link" onClick={toggleModal}>
              <span className="icon icon--filter icon-link__icon" />
              Filter
            </button>
          </div>
        )}
        <div className="nav__item">
          <Link pageName="overview" className="icon-link">
            <span className="icon icon--overview icon-link__icon" />
            {pageOverview?.title || "Technologies Overview"}
          </Link>
        </div>
        <div className="nav__item">
          <button className="icon-link" onClick={handleOpenClick}>
            <span className="icon icon--search icon-link__icon" />
            {searchLabel || "Search"}
          </button>
          <div className={classNames("nav__search", { "is-open": searchOpen })}>
            <Search
              value={search}
              onClose={closeSearch}
              onSubmit={handleSearchSubmit}
              onChange={handleSearchChange}
              open={searchOpen}
              ref={searchRef}
            />
          </div>
          {Boolean(tags.length) && (
            <TagsModal
              tags={tags}
              isOpen={modalIsOpen}
              closeModal={toggleModal}
              handleTagChange={handleTagChange}
            />
          )}
        </div>
      </div>
    </Branding>
  );
}
