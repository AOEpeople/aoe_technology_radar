import { Tag } from "../../model";

export default function ItemTags({ tags }: { tags?: Tag[] }) {
  if (!tags) {
    return null;
  }

  return (
    <div className="markdown">
      {"Tags: "}
      {tags.map((tag, id) => [
        id !== 0 && ", ",
        <span key={tag}>"{tag}"</span>,
      ])}
    </div>
  );
}
