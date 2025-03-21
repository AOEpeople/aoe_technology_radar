import { ImageResponse } from "next/og";

import { BaseCard } from "@/components/OpenGraph/BaseCard";
import { getAppName, getLabel } from "@/lib/data";

export const alt = "TechRadar Open Graph Image";
export const size = {
  width: 1200,
  height: 630,
};
export const dynamic = "force-static";

export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <BaseCard size={size.height}>
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
              width: `${size.width}px`,
            }}
          >
            {getAppName()}
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
            {getLabel("metaDescription")}
          </p>
        </div>
      </BaseCard>
    ),
    {
      ...size,
    },
  );
}
