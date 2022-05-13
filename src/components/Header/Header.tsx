import React, { useState, useRef } from "react";
import classNames from "classnames";
import Branding from "../Branding/Branding";
import Link from "../Link/Link";
import LogoLink from "../LogoLink/LogoLink";
import Search from "../Search/Search";
import { radarNameShort } from "../../config";
import { useNavigate } from "react-router-dom";
import qs from "query-string";
import { useMessages } from "../../context/MessagesContext";

export default function Header({ pageName }: { pageName: string }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchLabel, pageHelp, pageOverview } = useMessages();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

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
    navigate({
      pathname: "/overview.html",
      search: qs.stringify({ search: search }),
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
        </div>
      </div>
    </Branding>
  );
}
