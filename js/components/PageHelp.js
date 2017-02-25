import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';

export default function PageHelp({ leaving, onLeave }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <HeroHeadline>How to use AOE Technology Radar</HeroHeadline>
    </Fadeable>
  );
}
