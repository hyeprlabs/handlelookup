import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Handle Lookup — Check Username Availability Across 65+ Platforms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            color: "#a1a1aa",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          @
        </span>
        <span style={{ color: "#fafafa", fontSize: "20px", fontWeight: 600 }}>
          Handle Lookup
        </span>
      </div>
      <div
        style={{
          color: "#fafafa",
          fontSize: "56px",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: "900px",
        }}
      >
        Check Username Availability Across 65+ Platforms
      </div>
      <div
        style={{
          color: "#a1a1aa",
          fontSize: "24px",
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        One API call. Instant results. No rate limit headaches.
      </div>
    </div>,
    { ...size },
  );
}
