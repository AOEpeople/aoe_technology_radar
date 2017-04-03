import React from 'react';
import classNames from 'classnames';

export default function Branding({ logoContent, modifier, children }) {
  return (
    <div className={classNames('branding', { [`branding--${modifier}`]: modifier })}>
      <div className="branding__logo">
        {logoContent}
      </div>
      <div className="branding__content">
        {children}
      </div>
    </div>
  );
}
