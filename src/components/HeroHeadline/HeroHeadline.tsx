import React from 'react';
import './hero-headline.scss';
export default function ({ children, alt }: React.PropsWithChildren<{ alt?: string }>) {
  return (
    <div className='hero-headline'>
      {children}
      <span className='hero-headline__alt'>{alt}</span>
    </div>
  );
}
