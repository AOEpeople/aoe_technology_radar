import React from 'react';
import classNames from 'classnames';
import './branding.scss';
type BrandingProps = {
  logoContent: React.ReactNode;
  modifier?: 'backlink' | 'logo' | 'content' | 'footer';
};

export default function Branding({ logoContent, modifier, children }: React.PropsWithChildren<BrandingProps>) {
  return (
    <div className={classNames('branding', { [`branding--${modifier}`]: modifier })}>
      <div className='branding__logo'>{logoContent}</div>
      <div className='branding__content'>{children}</div>
    </div>
  );
}
