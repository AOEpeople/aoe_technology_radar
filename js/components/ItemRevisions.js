import React from 'react';
import HeadlineGroup from './HeadlineGroup';
import ItemRevision from './ItemRevision';

export default function ItemRevisions({ revisions }) {
  return (
    <div className="item-revisions">
      <HeadlineGroup secondary>
        <h4 className="headline headline--dark">Revisions:</h4>
      </HeadlineGroup>

      {revisions.map(revision => (
        <ItemRevision key={revision.release} revision={revision} />
      ))}
    </div>
  );
}
