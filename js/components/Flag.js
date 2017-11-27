import React from 'react';

export default function Flag({ item, short = false }) {
  if (item.flag !== 'default') {
    let name = item.flag.toUpperCase();
    if (short === true) {
      name = {
        new: 'N',
        changed: 'C',
      }[item.flag];
    }
    return <span className={`flag flag--${item.flag}`}>{name}</span>;
  }
  return null;
}
