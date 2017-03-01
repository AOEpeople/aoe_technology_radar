import React from 'react';
import classNames from 'classnames';

export default function Search({ value, onChange }) {
  return (
    <div className="search">
      <input value={value} type="text" onChange={(e) => { onChange(e.target.value); }} className="search__field" placeholder="Search" />
      <span className="icon icon--search search__icon" />
    </div>
  );
}
