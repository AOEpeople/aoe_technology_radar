import React from 'react';
import Branding from './Branding';

export default function Footer() {
  return (
    <Branding
      logoContent={<img src="/assets/logo.svg"/>}
    >
      <span className="footnote">
        AOE is a leading provider of Enterprise Open Source web solutions.
        Using current agile development methods, more than 250+ developers
        and consultants in 8 global locations develop customized Open Source
        solutions for global companies and corporations.
      </span>
    </Branding>
  );
}
