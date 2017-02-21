import React from 'react';

export default function Branding({ logoContent, children }) {
  return (
    <div className="branding">
      <div className="branding__logo">
        {logoContent}
      </div>
      <div className="branding__content">
        {children}
      </div>
    </div>
  );
}
