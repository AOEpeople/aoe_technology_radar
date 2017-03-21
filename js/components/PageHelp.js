import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

export default function PageHelp({ leaving, onLeave, ...props }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="How to use AOE Technology Radar" />
      <HeroHeadline>How to use AOE Technology Radar</HeroHeadline>
    </Fadeable>
  );
}
