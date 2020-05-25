import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Branding from './Branding';
import Link from './Link';
import LogoLink from './LogoLink';
import Search from './Search';
import actions from '../actions';
import { radarNameShort } from '../../common/config';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      searchOpen: false,
      search: '',
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

  handleSearchChange = (search) => {
    this.setState({
      search,
    });
  }

  handleSearchSubmit = () => {
    this.props.navigate('overview', true, {
      search: this.state.search,
    });

    this.setState({
      searchOpen: false,
      search: '',
    });
  }

  handleOpenClick = (e) => {
    e.preventDefault();
    this.openSearch();
    setTimeout(() => {
      this.search.focus();
    }, 0);
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
            <Link pageName="help-and-about-tech-radar" className="icon-link">
              <span className="icon icon--question icon-link__icon"></span>How to Use {radarNameShort}?
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
              <Search
                value={this.state.search}
                onClose={this.closeSearch}
                onSubmit={this.handleSearchSubmit}
                onChange={this.handleSearchChange}
                open={searchOpen}
                ref={(s) => { this.search = s; }}
              />
            </div>
          </div>
        </div>
      </Branding>
    );
  }
}


export default connect(
  undefined,
  actions
)(Header);
