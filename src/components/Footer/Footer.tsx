import React from 'react';
import classNames from 'classnames';
import Branding from '../Branding/Branding';
import FooterEnd from '../FooterEnd/FooterEnd';
import { assetUrl, getItemPageNames, isMobileViewport } from '../../config';
import { Item } from '../../model';
import './footer.scss';
export default function Footer({ items, pageName }: { items: Item[]; pageName: string }) {
  return (
    <div className={classNames('footer', { 'is-hidden': !isMobileViewport() && getItemPageNames(items).includes(pageName) })}>
      <Branding modifier='footer' logoContent={<img src={assetUrl('logo.svg')} width='150px' height='60px' alt='' />}>
        <span className='footnote'>
          AOE is a leading global provider of services for digital transformation and digital business models. AOE relies exclusively on established Enterprise
          Open Source technologies. This leads to innovative solutions, digital products and portals in agile software projects, and helps build long-lasting,
          strategic partnerships with our customers.
        </span>
      </Branding>
      <FooterEnd />
    </div>
  );
}
