import React from 'react';
import HeadlineGroup from '../HeadlineGroup/HeadlineGroup';
import ItemRevision from '../ItemRevision/ItemRevision';
import { Revision } from '../../model';
import './item-revisions.scss';
export default function ItemRevisions({ revisions }: { revisions: Revision[] }) {
  return (
    <div className='item-revisions'>
      <HeadlineGroup secondary>
        <h4 className='headline headline--dark'>Revisions:</h4>
      </HeadlineGroup>

      {revisions.map((revision) => (
        <ItemRevision key={revision.release} revision={revision} />
      ))}
    </div>
  );
}
