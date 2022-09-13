import { formatRelease } from "../../date";
import { Revision } from "../../model";
import Badge from "../Badge/Badge";

export default function ItemRevision({
  revision,
  dateFormat,
}: {
  revision: Revision;
  dateFormat?: string;
}) {
  return (
    <div className="item-revision">
      <div>
        <Badge type={revision.ring}>
          {revision.ring} | {formatRelease(revision.release, dateFormat)}
        </Badge>
      </div>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: revision.body }}
      />
    </div>
  );
}
