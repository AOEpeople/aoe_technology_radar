import { ConfigData } from "../../config";
import { Tag } from "../../model";
import Badge from "../Badge/Badge";
import "./item-tags.scss";

export default function ItemTags({
  tags,
  config,
}: {
  tags?: Tag[];
  config: ConfigData;
}) {
  if (!tags) {
    return null;
  }

  return (
    <div className="item-tags markdown">
      <span>Tags: </span>
      <div className="item-tags__badges">
        {tags.map((tag, id) => [
          <Badge key={id} type={"all"} config={config}>
            {tag}
          </Badge>,
        ])}
      </div>
    </div>
  );
}
