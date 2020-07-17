import React from 'react';
import classNames from 'classnames';
import Link from '../Link/Link';
import { assetUrl, radarNameShort } from '../../config';
import './logo-link.scss';
export default function LogoLink({ small = false }: { small?: boolean }) {
  return (
    <Link pageName='index' className={classNames('logo-link', { 'logo-link--small': small })}>
      <span className='logo-link__icon icon icon--back'/>
      <span className='logo-link__slide'>
        <img className='logo-link__img' src={assetUrl('logo.svg')} width='150px' height='60px' alt={radarNameShort} />
        <span className='logo-link__text'>{radarNameShort}</span>
      </span>
    </Link>
  );
}
