import { FC } from "react";

import { getAppName } from "@/lib/data";
import { formatTitle, formatTitleWithMissing } from "@/lib/format";

interface ItemInfoProps {
  size: { height: number; width: number };
  name?: string;
  segment?: string;
  ring?: string;
  description?: string;
}

export const ItemInfo: FC<ItemInfoProps> = ({
  size,
  name,
  segment,
  ring,
  description,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        flex: 1,
        padding: 50,
      }}
    >
      <h2
        style={{
          display: "block",
          fontWeight: "bold",
          width: `${size.width * 0.65}px`,
        }}
      >
        {formatTitleWithMissing(name, getAppName())}
      </h2>
      <span
        style={{
          fontSize: 32,
          width: `${size.width * 0.65}px`,
          flex: 1,
        }}
      >
        {formatTitleWithMissing(segment, ring)}
      </span>
      <p
        style={{
          display: "block",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "wrap",
          height: "17%",
          width: `${size.width * 0.75}px`,
          fontSize: 32,
        }}
      >
        {description}
      </p>
    </div>
  );
};
