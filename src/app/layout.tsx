import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { siteSettings } from "@/data/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ConsentBanner } from "@/components/site/consent-banner";
import { PublicChrome } from "@/components/site/public-chrome";
import { searchAction } from "./actions";
import "./globals.css";

/*
 * Inter Tight for display, Inter for everything else.
 *
 * latin-ext is not optional. Without it an umlaut falls back to a system font
 * in the middle of a word, which on a German site happens in the first
 * heading you read.
 *
 * Google Sans was asked for and is not used: it is Google proprietary, it is
 * not on Google Fonts and it is not licensed for third party sites. Inter
 * Tight is the closest legitimate match. To swap in a licensed equivalent
 * later, change --font-display in globals.css and nothing else.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.url),
  title: {
    default: `${siteSettings.name}: Unternehmenssoftware unabhängig geprüft`,
    template: `%s | ${siteSettings.name}`,
  },
  description:
    "Unabhängige Prüfung von Buchhaltungs-, Lohn-, HR-, CRM- und ERP-Software für den deutschen Mittelstand. Geprüfte Preise, GoBD, DATEV und E-Rechnung.",
  applicationName: siteSettings.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: siteSettings.name,
    url: siteSettings.url,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Softwareblick" }],
  },
  twitter: { card: "summary_large_image", images: ["/api/og"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publisher = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteSettings.operator.company,
    url: siteSettings.url,
    email: siteSettings.operator.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.operator.street,
      postalCode: siteSettings.operator.zip,
      addressLocality: siteSettings.operator.city,
      addressCountry: "DE",
    },
  };

  return (
    <html lang="de-DE" className={`${inter.variable} ${interTight.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <PublicChrome>
          <Header searchAction={searchAction} />
        </PublicChrome>
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <PublicChrome>
          <Footer />
          <ConsentBanner />
        </PublicChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(publisher) }}
        />
      </body>
    </html>
  );
}
