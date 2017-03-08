import React from 'react';
import classNames from 'classnames';

export default function Search({ value, onChange, onSubmit = () => {} }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        onChange={(e) => { onChange(e.target.value); }}
        className="search__field"
        placeholder="What are you looking for?"
      />
      <span className="search__button">
        <button type="submit" className="button">
          <span className="icon icon--search button__icon" />
          Search
        </button>
      </span>
    </form>
  );
}
