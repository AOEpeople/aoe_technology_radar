import React from 'react';
import Badge from '../Badge/Badge';
import { formatRelease } from '../../date';
import { Revision, Ring } from '../../model';

export default function ItemRevision({ revision }: { revision: Revision }) {
  return (
    <div className='item-revision'>
      <div>
        <Badge type={revision.ring}>
          {Ring[revision.ring]} | {formatRelease(revision.release)}
        </Badge>
      </div>
      <div className='markdown' dangerouslySetInnerHTML={{ __html: revision.body }} />
    </div>
  );
}
