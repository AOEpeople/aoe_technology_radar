import React from 'react';
import Badge from './Badge';
import ItemList from './ItemList';
import Link from './Link';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';
import ItemRevisions from './ItemRevisions';

import { translate } from '../../common/config';
import { groupByQuadrants } from '../../common/model';

class PageItem extends React.Component {

  getItem = (props) => {
    const [quadrantName, itemName] = props.pageName.split('/');
    const item = props.items.filter(item => item.quadrant === quadrantName && item.name === itemName)[0];
    return item;
  }

  getItemsInRing = (props) => {
    const item = this.getItem(props);
    const itemsInRing = groupByQuadrants(props.items)[item.quadrant][item.ring];
    return itemsInRing;
  };

  render() {
    const item = this.getItem(this.props);
    const itemsInRing = this.getItemsInRing(this.props);
    return (
      <Fadeable leaving={this.props.leaving} onLeave={this.props.onLeave}>
        <SetTitle {...this.props} title={item.title} />
        <div className="mobile-item-page">
          <div className="mobile-item-page__content">
            <div className="mobile-item-page__content__inner">
              <div className="mobile-item-page__header">
                <div className="split">
                  <div className="split__left">
                    <h3 className="headline">{translate(item.quadrant)}</h3>
                    <h1 className="hero-headline hero-headline--inverse">{item.title}</h1>
                  </div>
                  <div className="split__right">
                    <Badge big type={item.ring}>{item.ring}</Badge>
                  </div>
                </div>
              </div>
              <div className="markdown" dangerouslySetInnerHTML={{__html: item.body}} />
              {item.revisions.length > 1 && <ItemRevisions revisions={item.revisions.slice(1)} />}
            </div>
          </div>
        </div>
        <aside className="mobile-item-page__aside">
          <ItemList
              items={itemsInRing}
              activeItem={item}
          >
            <div className="split">
              <div className="split__left">
                <h3 className="headline">{translate(item.quadrant)}</h3>
              </div>
              <div className="split__right">
                <Link className="icon-link" pageName={item.quadrant}>
                  <span className="icon icon--pie icon-link__icon"></span>Zoom In
                </Link>
              </div>
            </div>
          </ItemList>
        </aside>
      </Fadeable>
    );
  }
}

export default PageItem;
