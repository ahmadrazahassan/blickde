import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteSettings } from "@/data/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* The edge runtime is deprecated in Next 16 and ImageResponse runs on Node.
   Pinning it here keeps the card out of the deprecation path. */
export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Social card. Same rules as the rest of the system: flat colour only, one
 * hairline, no gradient, weight 600 at most.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get("titel") ?? siteSettings.claim).slice(0, 110);
  const kicker = (searchParams.get("bereich") ?? "Unabhängig geprüft").slice(0, 40);
  const meta = (searchParams.get("meta") ?? "").slice(0, 80);
  const logo = await readFile(join(process.cwd(), "public", "brand", "softwareblick-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#71717A",
              fontWeight: 500,
            }}
          >
            {kicker}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: title.length > 60 ? 62 : 76,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#101014",
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {title}
          </div>

          {meta ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 26,
                lineHeight: 1.5,
                color: "#3F3F46",
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* One hairline, never a shadow and never a fade. */}
          <div style={{ display: "flex", height: 1, backgroundColor: "#E4E4E7", width: "100%" }} />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginTop: 28,
            }}
          >
            <img src={logoSrc} alt="Softwareblick" width={300} height={61} />
            {/* The one red mark on the card. */}
            <div style={{ display: "flex", width: 56, height: 4, backgroundColor: "#C0102A" }} />
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
