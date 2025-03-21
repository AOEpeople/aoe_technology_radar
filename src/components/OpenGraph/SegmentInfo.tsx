import { FC } from "react";

import { getAppName } from "@/lib/data";
import { Segment } from "@/lib/types";

interface SegmentProps {
  segment: Segment;
  size: { height: number; width: number };
}

export const SegmentInfo: FC<SegmentProps> = ({ segment, size }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        {segment.title} | {getAppName()}
      </h2>
      <p
        style={{
          display: "block",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "wrap",
          height: "25%",
          width: `${size.width * 0.75}px`,
          fontSize: 32,
        }}
      >
        {segment.description}
      </p>
    </div>
  );
};
