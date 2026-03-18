import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Handle Lookup API — Username Availability API Reference";
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
          fontSize: "52px",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: "900px",
        }}
      >
        Username Availability API
      </div>
      <div
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "12px",
          padding: "20px 32px",
          color: "#71717a",
          fontSize: "20px",
          fontFamily: "monospace",
          marginTop: "8px",
        }}
      >
        <span style={{ color: "#4ade80" }}>POST</span>
        <span style={{ color: "#fafafa" }}> /v1/lookup</span>
        <span style={{ color: "#71717a" }}> · 65+ platforms · JSON</span>
      </div>
    </div>,
    { ...size },
  );
}
