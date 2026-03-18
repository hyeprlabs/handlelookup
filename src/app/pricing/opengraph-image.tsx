import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Handle Lookup Pricing — Free & Pro Plans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
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
            style={{ color: "#a1a1aa", fontSize: "20px", fontFamily: "monospace" }}
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
          Simple Pricing
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: "24px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Start free. Upgrade when you need more API volume.
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          {["Free plan", "Pro plan", "Credit-based top-ups"].map((label) => (
            <div
              key={label}
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "#a1a1aa",
                fontSize: "18px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
