import React from 'react';
import classNames from 'classnames';

export default function Search({ value, onChange, onClose, open = false, onSubmit = () => {} }) {
  const closable = typeof onClose === 'function';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  }

  return (
    <form className={classNames('search', { 'search--closable': closable })} onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        onChange={(e) => { onChange(e.target.value); }}
        className="search__field"
        placeholder="What are you looking for?"
      />
      <span className={classNames('search__button', { 'is-open': open })}>
        <button type="submit" className="button">
          <span className="icon icon--search button__icon" />
          Search
        </button>
      </span>
      {
        closable && (
          <a href="#" className={classNames('search__close', { 'is-open': open })} onClick={handleClose}>
            <span className="icon icon--close" />
          </a>
        )
      }
    </form>
  );
}
