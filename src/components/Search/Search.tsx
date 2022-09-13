import classNames from "classnames";
import React, { FormEvent } from "react";

import { useMessages } from "../../context/MessagesContext";
import "./search.scss";

type SearchProps = {
  onClose?: () => void;
  onSubmit?: () => void;
  value: string;
  onChange: (value: string) => void;
  open?: boolean;
};

export default React.forwardRef((props: SearchProps, ref) => {
  return Search(props, ref);
});

function Search(
  { value, onChange, onClose, open = false, onSubmit = () => {} }: SearchProps,
  ref: any
) {
  const { searchLabel, searchPlaceholder } = useMessages();
  const closable = onClose !== undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClose != null) {
      onClose();
    }
  };

  return (
    <form
      className={classNames("search", { "search--closable": closable })}
      onSubmit={handleSubmit}
    >
      <input
        value={value}
        type="text"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="search__field"
        placeholder={searchPlaceholder}
        ref={ref}
      />
      <span className={classNames("search__button", { "is-open": open })}>
        <button type="submit" className="button">
          <span className="icon icon--search button__icon" />
          {searchLabel}
        </button>
      </span>
      {closable && (
        <button
          className={classNames("search__close link-button", {
            "is-open": open,
          })}
          onClick={handleClose}
        >
          <span className="icon icon--close" />
        </button>
      )}
    </form>
  );
}
