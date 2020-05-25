import React from 'react';
import classNames from 'classnames';
import Link from './Link';
import { assetUrl, radarNameShort } from '../../common/config';

export default function LogoLink({ small=false }) {
  return (
    <Link pageName="index" className={classNames('logo-link', { 'logo-link--small': small })}>
      <span className="logo-link__icon icon icon--back"></span>
      <span className="logo-link__slide">
        <img className="logo-link__img" src={assetUrl('logo.svg')} width="150px" height="60px" />
        <span className="logo-link__text">
          {radarNameShort}
        </span>
      </span>
    </Link>
  );
}
