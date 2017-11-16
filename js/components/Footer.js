import React from 'react';
import classNames from 'classnames';
import Branding from './Branding';
import FooterEnd from './FooterEnd';
import { assetUrl, getItemPageNames, isMobileViewport } from '../../common/config';

export default function Footer({ items, pageName }) {
  return (
    <div className={classNames('footer', {'is-hidden': !isMobileViewport() && getItemPageNames(items).includes(pageName)})}>
      <Branding
        modifier="footer"
        logoContent={<img src={assetUrl('haufe-logo.png')} width="180px" height="18px" />}
      >
        <span className="footnote">
        The Haufe Group stands for integrated cloud and desktop solutions in the areas of taxation, legal, bookkeeping, learning, and talent management It is a leading media and software vendor for professional online portals, e-procurement, online communities, and human resource & organizational development solutions.
        </span>
      </Branding>
      <FooterEnd/>
    </div>
  );
}
