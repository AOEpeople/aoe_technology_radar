import React from 'react';
import classNames from 'classnames';
import Link from './Link';
import { assetUrl } from '../../common/config';

export default function LogoLink({ small=false }) {
  return (
    <Link pageName="index" className={classNames('logo-link', { 'logo-link--small': small })}>
      <span className="logo-link__icon icon icon--back"></span>
      <span className="logo-link__slide">
        <img className="logo-link__img" src={assetUrl('haufe-logo.png')} width="240px" height="23px" />
        <span className="logo-link__text">
          Technology Radar
        </span>
      </span>
    </Link>
  );
}
