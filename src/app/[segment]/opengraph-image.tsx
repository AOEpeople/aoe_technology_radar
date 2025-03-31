import { ImageResponse } from "next/og";

import { BaseCard } from "@/components/OpenGraph/BaseCard";
import { SegmentInfo } from "@/components/OpenGraph/SegmentInfo";
import { getSegment, getSegments } from "@/lib/data";

export const size = {
  width: 1200,
  height: 630,
};
export const dynamic = "force-static";

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const res = await params;
  const segment = getSegment(res.segment);

  return new ImageResponse(
    (
      <BaseCard currentSegment={segment} size={size.height}>
        {segment && <SegmentInfo segment={segment} size={size} />}
      </BaseCard>
    ),
    {
      ...size,
    },
  );
}

export async function generateStaticParams() {
  return getSegments().map((segment) => ({ segment: segment.id }));
}
