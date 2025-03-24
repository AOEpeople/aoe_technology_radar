import { ImageResponse } from "next/og";

import { BaseCard } from "@/components/OpenGraph/BaseCard";
import { ItemInfo } from "@/components/OpenGraph/ItemInfo";
import { getItem, getItems, getRing, getSegment } from "@/lib/data";
import { htmlToText, limitTextLength } from "@/lib/format";

export const alt = "TechRadar Open Graph Image";
export const size = {
  width: 1200,
  height: 630,
};
export const dynamic = "force-static";

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string; segment: string }>;
}) {
  const res = await params;
  const item = getItem(res.id);
  const segment = getSegment(res.segment);
  const trimmedItemBody = limitTextLength(htmlToText(item?.body ?? ""), 100);
  const ring = getRing(item?.ring ?? "");

  return new ImageResponse(
    (
      <BaseCard currentSegment={segment} size={size.height}>
        <ItemInfo
          size={size}
          name={item?.title}
          segment={segment?.title}
          ring={ring}
          description={trimmedItemBody}
        />
      </BaseCard>
    ),
    {
      ...size,
    },
  );
}

export async function generateStaticParams() {
  return getItems().map((item) => ({
    segment: item.segment,
    id: item.id,
  }));
}
