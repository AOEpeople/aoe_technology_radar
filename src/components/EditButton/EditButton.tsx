import React from "react";
import { Item } from "../../model";
import "./editButton.scss";

type EditButtonProps = {
  baseUrl: string;
  item: Item & { release? : string }
  title?: string;
};

export default function EditButton({baseUrl, item, title}: React.PropsWithChildren<EditButtonProps>) {
  const href = `${baseUrl}/${item.release}/${item.name}.md`;
  return (
    <a className="icon-link" href={href} target="_blank" rel="noopener noreferrer">{title || 'Edit'}</a>
  );
}
