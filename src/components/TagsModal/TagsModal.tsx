import { ChangeEvent } from "react";
import ReactModal from "react-modal";

import { useSearchParamState } from "../../hooks/use-search-param-state";
import { Tag } from "../../model";
import "./tags-modal.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-gray-dark)",
    color: "var(--color-white)",
    padding: 0,
    borderRadius: "20px",
  },
  overlay: {
    zIndex: 999,
    backgroundColor: "rgba(71, 81, 87, 0.6)",
  },
};

ReactModal.setAppElement("#root");

type TagsModalProps = {
  tags: Tag[];
  isOpen: boolean;
  closeModal: () => void;
  handleTagChange: (tag: Tag) => void;
};

export default function TagsModal({
  tags,
  isOpen,
  closeModal,
  handleTagChange,
}: TagsModalProps) {
  const [searchParamState] = useSearchParamState();
  let { tags: tagsFromURL } = searchParamState;
  tagsFromURL = Array.isArray(tagsFromURL) ? tagsFromURL : [tagsFromURL];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    handleTagChange(value);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Filters Modal"
      closeTimeoutMS={300}
    >
      <div className="tags-modal">
        <button
          onClick={closeModal}
          className="tags-modal__close-button link-button"
        >
          <span className="icon icon--close" />
        </button>
        <h4 className="headline tags-modal__title">Choose your filters</h4>
        <ul
          className="tags-modal__list"
          style={{ columns: Math.ceil(tags.length / 8) }}
        >
          {tags.map((tag, index) => (
            <li key={index} className="tags-modal__list-item">
              <input
                type="checkbox"
                id={`tag-checkbox-${index}`}
                className="tags-modal__list-item-checkbox"
                name={tag}
                value={tag}
                checked={tagsFromURL.includes(tag)}
                onChange={handleChange}
              />
              <label htmlFor={`tag-checkbox-${index}`}>{tag}</label>
            </li>
          ))}
        </ul>
      </div>
    </ReactModal>
  );
}
