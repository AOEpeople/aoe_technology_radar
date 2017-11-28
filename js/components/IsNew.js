import React from 'react';

export default function IsNew({ item }) {
  if (item.isNew) {
    return <span className="is-new">NEW</span>;
  }
  return null;
}
