import React from 'react';
import classNames from 'classnames';
import Branding from './Branding';
import { getItemPageNames } from '../../common/config';

export default function Footer({ items, pageName }) {
  return (
    <div className={classNames('footer', {'is-hidden': getItemPageNames(items).includes(pageName)})}>
      <Branding
        logoContent={<img src="/assets/logo.svg" width="150px" height="60px" />}
      >
        <span className="footnote">
          AOE is a leading provider of Enterprise Open Source web solutions.
          Using current agile development methods, more than 250+ developers
          and consultants in 8 global locations develop customized Open Source
          solutions for global companies and corporations.
        </span>
      </Branding>
    </div>
  );
}
