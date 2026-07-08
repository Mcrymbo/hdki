/** Shared visual for the site-wide og/twitter image routes — see app/opengraph-image.tsx. */
export function OgImageTemplate({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111111",
        backgroundImage: "linear-gradient(135deg, #111111 0%, #1f1f1f 60%, #dc2626 150%)",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 140,
          height: 140,
          border: "4px solid #dc2626",
          backgroundColor: "#dc2626",
          marginBottom: 40,
        }}
      >
        <span style={{ fontSize: 44, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>HDKI</span>
      </div>
      <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>
        {title}
      </div>
      <div style={{ display: "flex", fontSize: 32, fontWeight: 400, color: "#f3f4f6", marginTop: 20 }}>
        {subtitle}
      </div>
    </div>
  );
}

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
