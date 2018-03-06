import React from 'react';
import ReactDOM from 'react-dom';
import { formatRelease } from '../date';
import HeroHeadline from './HeroHeadline';
import RadarChart from './RadarChart';
import QuadrantGrid from './QuadrantGrid';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

export default function PageIndex({ leaving, onLeave, items, navigate, ...props }) {
  const newestRelease = props.releases.slice(-1)[0];
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="Technology Radar" />
      <div className="headline-group">
        <HeroHeadline alt={formatRelease(newestRelease)}>Haufe Technology Radar</HeroHeadline>
      </div>
      <QuadrantGrid items={items} />
    </Fadeable>
  );
}
