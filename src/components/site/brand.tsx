import Image from "next/image";
import Link from "next/link";

/** The generated Softwareblick mark and custom wordmark, shared by every page. */
export function Brand({ inverse = false, large = false }: { inverse?: boolean; large?: boolean }) {
  return (
    <Link href="/" aria-label="Softwareblick – Startseite" className="inline-flex max-w-full items-center">
      <Image
        src="/brand/softwareblick-logo.png"
        alt="Softwareblick"
        width={1745}
        height={353}
        priority={!large}
        className={`${large ? "h-auto w-[min(100%,680px)]" : "h-auto w-[174px] sm:w-[194px]"} ${inverse ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
