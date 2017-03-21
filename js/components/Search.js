import React from 'react';
import classNames from 'classnames';

class Search extends React.Component {
  focus() {
    this.input.focus();
  }

  render() {
    const { value, onChange, onClose, open = false, onSubmit = () => {} } = this.props;

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
          ref={(input) => { this.input = input; }}
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
}

export default Search;
