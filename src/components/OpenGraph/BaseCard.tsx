import { FC, ReactNode } from "react";

import { BackgroundImage } from "./BackgroundImage";

import {
  getColors,
  getItems,
  getRings,
  getSegments,
  getTags,
} from "@/lib/data";
import { Item, Ring, Segment } from "@/lib/types";
import { listContainsAny } from "@/lib/utils";

interface BaseCardProps {
  children: ReactNode;
  currentSegment?: Segment;
  size: number;
}

export const BaseCard: FC<BaseCardProps> = ({
  children,
  currentSegment = undefined,
  size = 800,
}) => {
  const colors = getColors();
  const segments = getSegments();
  const rings = getRings();
  const tags = getTags();
  const items = getItems(undefined, true).filter((item) =>
    listContainsAny(item.tags ?? [], tags),
  );
  const bottomColorHeight = 20;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        background: colors.background,
      }}
    >
      <div
        style={{
          fontSize: 40,
          background: colors.background,
          color: colors.content,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div
          style={{
            padding: `${bottomColorHeight}px`,
            display: "flex",
          }}
        >
          <BackgroundImage
            size={size - bottomColorHeight * 3}
            segments={segments}
            rings={rings}
            items={items}
          />
        </div>
        <div
          style={{
            justifySelf: "start",
            display: "flex",
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          height: `${bottomColorHeight}px`,
          width: "100%",
          bottom: 0,
        }}
      >
        {segments.map((seg) => (
          <span
            style={{
              flex: seg.id === currentSegment?.id ? segments.length : 1,
              backgroundColor: seg?.color,
            }}
            key={seg.id}
          />
        ))}
      </span>
    </div>
  );
};
