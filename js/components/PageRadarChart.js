import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';
import RadarChart from './RadarChart';

export default function PageRadarChart({ leaving, onLeave, items, navigate, ...props }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="Haufe Technology Radar Chart" />
      
      <RadarChart items={items} />
    </Fadeable>
  );
}
