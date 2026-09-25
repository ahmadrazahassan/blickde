import Image from "next/image";

const partners = [
  { name: "Farben Fassott", src: "/partner-logos/farben-fassott.png", width: 200, height: 70 },
  { name: "Malermeister Andy", src: "/partner-logos/malermeister-andy.png", width: 102, height: 77 },
  { name: "Farbfokus", src: "/partner-logos/farbfokus.png", width: 155, height: 87 },
  { name: "Martin Bienek", src: "/partner-logos/martin-bienek.png", width: 170, height: 78 },
  { name: "Willy Rix Malerbetrieb", src: "/partner-logos/woelly-rix.png", width: 205, height: 69 },
  { name: "Farbkonzept Kai Schaefer GmbH", src: "/partner-logos/kai-schaefer.png", width: 190, height: 74 },
  { name: "Effect Isi", src: "/partner-logos/effect-isi.png", width: 192, height: 76 },
  { name: "SP Maler", src: "/partner-logos/sp-maler.png", width: 155, height: 86 },
] as const;

export function PartnerMarquee() {
  return (
    <section aria-labelledby="partner-heading" className="border-b border-[var(--color-rule)] bg-white py-10 md:py-12">
      <div className="container-page text-center">
        <p className="t-micro text-[var(--color-accent)]">Partnernetzwerk</p>
        <h2 id="partner-heading" className="mt-3 font-[var(--font-display)] text-[clamp(1.3rem,2vw,1.65rem)] font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
          Unsere Partnerunternehmen
        </h2>
      </div>
      <div className="partner-marquee mt-7" tabIndex={0} aria-label="Logos unserer Partnerunternehmen">
        <div className="partner-marquee-track">
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} className={`partner-marquee-set${duplicate ? " partner-marquee-copy" : ""}`} aria-hidden={duplicate || undefined}>
              {partners.map((partner) => (
                <li key={partner.name} className="partner-marquee-item">
                  <Image
                    src={partner.src}
                    alt={duplicate ? "" : partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="max-h-[72px] max-w-[190px] object-contain"
                    unoptimized
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
