import React from "react";
import HeadlineGroup from "../HeadlineGroup/HeadlineGroup";
import ItemRevision from "../ItemRevision/ItemRevision";
import { Revision } from "../../model";
import "./item-revisions.scss";
import { useMessages } from "../../context/MessagesContext";
export default function ItemRevisions({
  revisions,
}: {
  revisions: Revision[];
}) {
  const { revisionsText } = useMessages();
  return (
    <div className="item-revisions">
      <HeadlineGroup secondary>
        <h4 className="headline headline--dark">{revisionsText ?? 'Revisions:'}</h4>
      </HeadlineGroup>

      {revisions.map((revision) => (
        <ItemRevision key={revision.release} revision={revision} />
      ))}
    </div>
  );
}
