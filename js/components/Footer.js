import React from 'react';
import classNames from 'classnames';
import Branding from './Branding';
import { getItemPageNames, isMobileViewport } from '../../common/config';

export default function Footer({ items, pageName }) {
  return (
    <div className={classNames('footer', {'is-hidden': !isMobileViewport() && getItemPageNames(items).includes(pageName)})}>
      <Branding
        modifier="footer"
        logoContent={<img src="/assets/logo.svg" width="150px" height="60px" />}
      >
        <span className="footnote">
      AOE is a leading global provider of services for digital transformation and digital business models. AOE relies exclusively on established Enterprise Open Source technologies. This leads to innovative solutions, digital products and portals in agile software projects, and helps build long-lasting, strategic partnerships with our customers.
        </span>
      </Branding>
    </div>
  );
}
