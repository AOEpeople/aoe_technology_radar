import React from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';
import PageQuadrant from './PageQuadrant';
import PageItem from './PageItem';
import PageItemMobile from './PageItemMobile';
import { quadrants, getItemPageNames, isMobileViewport } from '../../common/config';

const getPageByName = (items, pageName) => {
  if (pageName === 'index') {
    return PageIndex;
  }
  if (pageName === 'overview') {
    return PageOverview;
  }
  if (pageName === 'help-and-about-tech-radar') {
    return PageHelp;
  }
  if (quadrants.includes(pageName)) {
    return PageQuadrant;
  }
  if (getItemPageNames(items).includes(pageName)) {
    return isMobileViewport() ? PageItemMobile : PageItem;
  }

  return 'div';
}

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: props.pageName,
      leaving: false,
    };
  }

  componentWillReceiveProps({ pageName }) {
    const leaving = getPageByName(this.props.items, pageName) !== getPageByName(this.props.items, this.state.pageName);

    if (leaving) {
      this.setState({
        ...this.state,
        nextPageName: pageName,
        leaving: true,
      });
    } else {
      // stay on same page
      this.setState({
        ...this.state,
        pageName,
      });
    }
  }

  handlePageLeave = () => {
    this.setState({
      ...this.state,
      pageName: this.state.nextPageName,
      leaving: true,
      nextPageName: null,
    });

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.setState({
          ...this.state,
          leaving: false,
        });
      });
    }, 0);
  };

  render() {
    const { pageName, leaving } = this.state;
    const Comp = getPageByName(this.props.items, pageName);
    return <Comp {...this.props} pageName={pageName} leaving={leaving} onLeave={this.handlePageLeave} />;
  }
}

export default Router;
