import React from 'react';

export default function Header({ navigate }) {
  const handleClick = (pageName) => (e) => {
    e.preventDefault();
    navigate(pageName);
  };

  return (
    <div className="branding">
      <a onClick={handleClick('index')} className="branding__logo" href="/"><img src="/assets/logo.svg"/></a>
      <div className="branding__content">
        <div className="nav">
          <div onClick={handleClick('help')} className="nav__item"><a className="icon-link" href="/help.html"><span className="icon icon--question icon-link__icon"></span>How to Use Technology Radar?</a></div>
          <div onClick={handleClick('overview')} className="nav__item"><a className="icon-link" href="/overview.html"><span className="icon icon--overview icon-link__icon"></span>Technologies Overview</a></div>
          <div className="nav__item"><a className="icon-link" href="#todo"><span className="icon icon--search icon-link__icon"></span>Search</a></div>
        </div>
      </div>
    </div>
  );
}
