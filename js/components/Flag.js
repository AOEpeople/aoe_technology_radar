import React from 'react';

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Flag({ item, short = false }) {
  if (item.flag !== 'default') {
    let name = item.flag.toUpperCase();
    let title = ucFirst(item.flag);
    if (short === true) {
      name = {
        new: 'N',
        changed: 'C',
      }[item.flag];
    }
    return <span className={`flag flag--${item.flag}`} title={title}>{name}</span>;
  }
  return null;
}
