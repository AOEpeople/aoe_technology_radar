import React from 'react';
import Badge from './Badge';
import { formatRelease } from '../date';

export default function ItemRevision({ revision }) {
  return (
    <div className="item-revision">
      <div>
        <Badge type={revision.ring}>{revision.ring} | {formatRelease(revision.release)}</Badge>
      </div>
      <div className="markdown" dangerouslySetInnerHTML={{__html: revision.body}} />
    </div>
  );
}
