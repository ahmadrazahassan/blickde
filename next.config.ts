import type { NextConfig } from "next";

const oldPublicRoutes = [
  ["/software/:slug/bewertungen/neu", "/unternehmenssoftware-vergleichen/:slug/erfahrungen-und-bewertungen/bewertung-verfassen"],
  ["/software/:slug/bewertungen", "/unternehmenssoftware-vergleichen/:slug/erfahrungen-und-bewertungen"],
  ["/software/:slug/alternativen", "/unternehmenssoftware-vergleichen/:slug/vergleichbare-alternativen"],
  ["/software/:slug", "/unternehmenssoftware-vergleichen/:slug"],
  ["/software", "/unternehmenssoftware-vergleichen"],
  ["/kategorie/:slug", "/software-kategorien/:slug"],
  ["/kategorien", "/software-kategorien"],
  ["/vergleich/:paar", "/software-im-direktvergleich/:paar"],
  ["/vergleich", "/software-im-direktvergleich"],
  ["/ratgeber/:slug", "/ratgeber-fuer-unternehmenssoftware/:slug"],
  ["/ratgeber", "/ratgeber-fuer-unternehmenssoftware"],
  ["/newsletter/bestaetigen", "/software-newsletter-anmelden/anmeldung-bestaetigen"],
  ["/newsletter/abmelden", "/software-newsletter-anmelden/newsletter-abmelden"],
  ["/newsletter", "/software-newsletter-anmelden"],
  ["/go/:slug", "/zum-softwareanbieter/:slug"],
  ["/e-rechnung", "/e-rechnung-fuer-unternehmen"],
  ["/suche", "/software-und-wissen-durchsuchen"],
  ["/glossar", "/software-fachbegriffe-erklaert"],
  ["/kontakt", "/kontakt-zur-redaktion"],
  ["/ueber-uns", "/ueber-softwareblick-und-unsere-mission"],
  ["/presse", "/presse-und-medieninformationen"],
  ["/software-eintragen", "/softwareprodukt-zur-pruefung-einreichen"],
  ["/bewertungsmethodik", "/bewertungsmethodik-fuer-software"],
  ["/redaktionsrichtlinien", "/redaktionelle-richtlinien-und-pruefprozess"],
  ["/affiliate-hinweis", "/transparenz-zu-affiliate-links"],
  ["/impressum", "/anbieterkennzeichnung-und-impressum"],
  ["/datenschutz", "/datenschutzerklaerung-und-privatsphaere"],
  ["/cookie-richtlinie", "/cookie-richtlinie-und-einstellungen"],
  ["/nutzungsbedingungen", "/nutzungsbedingungen-der-website"],
  ["/barrierefreiheit", "/erklaerung-zur-barrierefreiheit"],
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return oldPublicRoutes.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
