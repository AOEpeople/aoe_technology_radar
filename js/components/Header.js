import React from 'react';
import Branding from './Branding';
import Link from './Link';

export default function Header() {
  return (
    <Branding
      logoContent={<Link pageName="index"><img src="/assets/logo.svg"/></Link>}
    >
      <div className="nav">
        <div className="nav__item">
          <Link pageName="help" className="icon-link">
            <span className="icon icon--question icon-link__icon"></span>How to Use Technology Radar?
          </Link>
        </div>
        <div className="nav__item">
          <Link pageName="overview" className="icon-link">
            <span className="icon icon--overview icon-link__icon"></span>Technologies Overview
          </Link>
        </div>
        <div className="nav__item">
          <a className="icon-link" href="#todo">
            <span className="icon icon--search icon-link__icon"></span>Search
          </a>
        </div>
      </div>
    </Branding>
  );
}
