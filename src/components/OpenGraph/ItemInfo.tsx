import { FC } from "react";

import { getAppName, getColors } from "@/lib/data";
import { formatTitleWithMissing, limitTextLength } from "@/lib/format";
import { Ring } from "@/lib/types";

interface ItemInfoProps {
  size: { height: number; width: number };
  name?: string;
  segment?: string;
  ring?: Ring;
  description?: string;
}

export const ItemInfo: FC<ItemInfoProps> = ({
  size,
  name,
  segment,
  ring,
  description,
}) => {
  const colors = getColors();
  const descTextSize = 28;
  const descLineHeight = 32;
  const descPaddingVert = 20;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        flex: 1,
        padding: "30px 50px",
      }}
    >
      <h2
        style={{
          display: "block",
          fontWeight: "bold",
          width: `${size.width * 0.75}px`,
        }}
      >
        {limitTextLength(formatTitleWithMissing(name, getAppName()), 50)}
      </h2>
      {segment && (
        <span
          style={{
            fontSize: 32,
            width: `${size.width * 0.65}px`,
            flex: 1,
          }}
        >
          {limitTextLength(segment, 80)}
        </span>
      )}
      {description && (
        <p
          style={{
            display: "flex",
            maxHeight: `${48 + 2 * descPaddingVert + 2 * descLineHeight}px`,
            width: `${size.width * 0.75}px`,
            padding: `${24 + descPaddingVert}px 24px`,
            borderRadius: "12px",
            backgroundColor: colors.foreground,
            whiteSpace: "wrap",
            textAlign: "left",
            fontSize: `${descTextSize}px`,
            lineHeight: `${descLineHeight}px`,
            color: colors.text,
          }}
        >
          {limitTextLength(description, 100)}
          {ring && (
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: `-${descPaddingVert}px`,
                left: "32px",
              }}
            >
              <span
                style={{
                  borderRadius: "100px",
                  background: ring.color,
                  color: colors.content,
                  width: "auto",
                  padding: "12px 32px",
                  textTransform: "uppercase",
                  alignItems: "center",
                  fontSize: "28px",
                  lineHeight: "28px",
                  flexShrink: 0,
                }}
              >
                {ring.title}
              </span>
            </div>
          )}
        </p>
      )}
    </div>
  );
};
