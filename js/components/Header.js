import React from 'react';
import classNames from 'classnames';
import Branding from './Branding';
import Link from './Link';
import LogoLink from './LogoLink';
import Search from './Search';
import { getItemPageNames } from '../../common/config';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      searchOpen: false,
    };
  }

  openSearch = () => {
    this.setState({
      searchOpen: true,
    });
  }

  closeSearch = () => {
    this.setState({
      searchOpen: false,
    });
  }

  handleOpenClick = (e) => {
    e.preventDefault();
    this.openSearch();
  }

  render() {
    const { pageName } = this.props;
    const { searchOpen } = this.state;
    const smallLogo = pageName !== 'index';

    return (
      <Branding
        logoContent={<LogoLink small={smallLogo} />}
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
            <a className="icon-link" href="#" onClick={this.handleOpenClick}>
              <span className="icon icon--search icon-link__icon"></span>Search
            </a>
            <div className={classNames('nav__search', { 'is-open': searchOpen })}>
              <Search onClose={this.closeSearch} open={searchOpen} />
            </div>
          </div>
        </div>
      </Branding>
    );
  }
}

export default Header;
