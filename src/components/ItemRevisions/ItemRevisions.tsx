import { useMessages } from "../../context/MessagesContext";
import { Revision } from "../../model";
import HeadlineGroup from "../HeadlineGroup/HeadlineGroup";
import ItemRevision from "../ItemRevision/ItemRevision";
import "./item-revisions.scss";

export default function ItemRevisions({
  revisions,
  dateFormat,
}: {
  revisions: Revision[];
  dateFormat?: string;
}) {
  const { revisionsText } = useMessages();
  return (
    <div className="item-revisions">
      <HeadlineGroup secondary>
        <h4 className="headline headline--dark">
          {revisionsText ?? "Revisions:"}
        </h4>
      </HeadlineGroup>

      {revisions.map((revision) => (
        <ItemRevision
          key={revision.release}
          revision={revision}
          dateFormat={dateFormat}
        />
      ))}
    </div>
  );
}
