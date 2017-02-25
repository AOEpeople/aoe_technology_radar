import React from 'react';
import PageIndex from './PageIndex';
import PageOverview from './PageOverview';
import PageHelp from './PageHelp';
import PageQuadrant from './PageQuadrant';
import PageItem from './PageItem';
import { quadrants, getItemPageNames } from '../../common/config';


const getPageByName = (items, pageName) => {
  if (pageName === 'index') {
    return PageIndex;
  }
  if (pageName === 'overview') {
    return PageOverview;
  }
  if (pageName === 'help') {
    return PageHelp;
  }
  if (quadrants.includes(pageName)) {
    return PageQuadrant;
  }
  if (getItemPageNames(items).includes(pageName)) {
    return PageItem;
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
    this.setState({
      ...this.state,
      nextPageName: pageName,
      leaving: true,
    });
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
