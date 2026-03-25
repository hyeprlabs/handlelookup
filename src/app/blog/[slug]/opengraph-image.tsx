import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS: Record<string, string> = {
  tutorials: "#3b82f6",
  guides: "#8b5cf6",
  changelog: "#10b981",
  product: "#f97316",
};

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  const title = (post?.title as string) ?? "Handle Lookup Blog";
  const description =
    (post?.description as string) ??
    "Tutorials, guides, and updates from the Handle Lookup team.";
  const category = (post?.category as string) ?? "";
  const accentColor = CATEGORY_COLORS[category] ?? "#18181b";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            background: accentColor,
            marginBottom: 32,
          }}
        />

        {/* Category label */}
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: accentColor,
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 44 : 52,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#fafafa",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            lineHeight: 1.5,
            color: "#a1a1aa",
            maxWidth: 780,
            marginBottom: "auto",
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid #27272a",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 14, color: "#09090b", fontWeight: 700 }}>
                @
              </span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#fafafa" }}>
              Handle Lookup
            </span>
          </div>
          <span style={{ fontSize: 14, color: "#71717a" }}>
            handlelookup.com/blog
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
