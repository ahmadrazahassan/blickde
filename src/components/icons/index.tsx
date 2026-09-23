import type { SVGProps } from "react";

/**
 * The house icon set.
 *
 * Rules, without exception:
 *   24 x 24 grid, geometry on half pixels
 *   stroke only, never filled
 *   stroke="currentColor", inherits from the parent
 *   stroke-width 1.5, round caps and joins
 *   no background, no circle, no tinted plate
 *   one literal object drawn from the noun it labels
 *
 * If a label has no literal object, it gets no icon. A missing icon is always
 * better than a decorative one.
 */

export type IconProps = SVGProps<SVGSVGElement> & {
  /** 16 inline, 18 in list rows, 20 in buttons, 24 standalone. Never larger. */
  size?: 16 | 18 | 20 | 24;
};

function Svg({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------- navigation */

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 20 20" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15.5" />
    <path d="m13.5 6 6 6-6 6" />
  </Svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12H4.5" />
    <path d="m10.5 6-6 6 6 6" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5.5 9 6.5 6.5L18.5 9" />
  </Svg>
);

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 5.5 6.5 6.5L9 18.5" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 6.5h17" />
    <path d="M3.5 12h17" />
    <path d="M3.5 17.5h17" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5.5 5.5 13 13" />
    <path d="m18.5 5.5-13 13" />
  </Svg>
);

export const IconExternal = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.5 4.5H19.5V10.5" />
    <path d="m19.5 4.5-8 8" />
    <path d="M17 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4 18.5v-10A1.5 1.5 0 0 1 5.5 7h4" />
  </Svg>
);

/* ------------------------------------------------------------------ status */

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

export const IconDash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 12h11" />
  </Svg>
);

/** A question mark in a square. Used only for "not verified". */
export const IconUnverified = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="4.5" width="15" height="15" rx="2" />
    <path d="M9.75 9.5a2.25 2.25 0 1 1 2.75 2.2v1.3" />
    <path d="M12.5 16.25h.01" />
  </Svg>
);

export const IconStar = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p} fill={filled ? "currentColor" : "none"}>
    <path d="m12 4 2.5 5.2 5.5.8-4 4 .95 5.5L12 16.9 7.05 19.5 8 14l-4-4 5.5-.8z" />
  </Svg>
);

/* ------------------------------------------------------------ real objects */

/** A euro sign. For a price. */
export const IconEuro = (p: IconProps) => (
  <Svg {...p}>
    <path d="M17.5 6.5a6.5 6.5 0 0 0-9.4 2.2 7.5 7.5 0 0 0 0 6.6 6.5 6.5 0 0 0 9.4 2.2" />
    <path d="M4.5 10.25h8" />
    <path d="M4.5 13.75h8" />
  </Svg>
);

/** A speech bubble with a check inside. For a verified review. */
export const IconReview = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5z" />
    <path d="m8.75 10.5 2 2 4-4.25" />
  </Svg>
);

/** A document with lines. */
export const IconDocument = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.5 3.5H6.5A1.5 1.5 0 0 0 5 5v14a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V9z" />
    <path d="M13.5 3.5V9H19" />
    <path d="M8.5 13h7" />
    <path d="M8.5 16.5h5" />
  </Svg>
);

/** A bound ledger. For accounting. */
export const IconLedger = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 4.5h12A1.5 1.5 0 0 1 19 6v13.5H7A1.5 1.5 0 0 1 5.5 18z" />
    <path d="M5.5 16.5H19" />
    <path d="M9.5 4.5v12" />
    <path d="M12.5 8.5h3.5" />
    <path d="M12.5 12h3.5" />
  </Svg>
);

/** A payslip: a sheet with a currency line. */
export const IconPayslip = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" />
    <path d="M9 8h6" />
    <path d="M9 11.5h6" />
    <path d="M9 15h3" />
  </Svg>
);

/** Two people. For personnel. */
export const IconPeople = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9.5" cy="8.5" r="3" />
    <path d="M3.5 19.5a6 6 0 0 1 12 0" />
    <path d="M16 6.2a3 3 0 0 1 0 5.6" />
    <path d="M17.5 14.5a5.5 5.5 0 0 1 3 5" />
  </Svg>
);

/** An address card. For a contact record. */
export const IconContact = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
    <circle cx="9" cy="10.5" r="2" />
    <path d="M5.75 16a3.5 3.5 0 0 1 6.5 0" />
    <path d="M14.5 10h4" />
    <path d="M14.5 13.5h4" />
  </Svg>
);

/** Four stacked blocks. For an integrated system. */
export const IconBlocks = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
  </Svg>
);

/** A planning board with columns. */
export const IconBoard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
    <path d="M9 4.5v15" />
    <path d="M15 4.5v15" />
    <path d="M5.75 8h1" />
    <path d="M11.25 8h1" />
    <path d="M17.25 8h1" />
  </Svg>
);

/** A shipping carton. */
export const IconPackage = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 20.5 8v8L12 20.5 3.5 16V8z" />
    <path d="M3.5 8 12 12.5 20.5 8" />
    <path d="M12 12.5v8" />
  </Svg>
);

/** A till receipt. */
export const IconReceipt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 3.5h13v17l-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6-2.2-1.6z" />
    <path d="M8.5 8h7" />
    <path d="M8.5 11.5h7" />
    <path d="M8.5 15h4" />
  </Svg>
);

/** A calendar sheet. For a verification date. */
export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3.5v3" />
    <path d="M16 3.5v3" />
    <path d="M7.5 13h2" />
    <path d="M11 13h2" />
  </Svg>
);

/** A building. For a company. */
export const IconBuilding = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 20.5V5A1.5 1.5 0 0 1 6 3.5h7A1.5 1.5 0 0 1 14.5 5v15.5" />
    <path d="M14.5 9.5h4A1.5 1.5 0 0 1 20 11v9.5" />
    <path d="M3 20.5h18" />
    <path d="M7.5 7.5h3.5" />
    <path d="M7.5 11.5h3.5" />
    <path d="M7.5 15.5h3.5" />
  </Svg>
);

/** An envelope. */
export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

/** A telephone handset. */
export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 4.5 10.5 8l-2 2a11 11 0 0 0 5.5 5.5l2-2 3.5 2v3a1.5 1.5 0 0 1-1.7 1.5A16.5 16.5 0 0 1 4 6.2 1.5 1.5 0 0 1 5.5 4.5z" />
  </Svg>
);

/** A padlock. For data protection. */
export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="10" width="15" height="10" rx="1.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    <path d="M12 14v2.5" />
  </Svg>
);

/** A magnifying glass over a document. For an audit. */
export const IconAudit = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18.5 10.5V9l-5.5-5.5H6.5A1.5 1.5 0 0 0 5 5v14a1.5 1.5 0 0 0 1.5 1.5h4" />
    <path d="M13 3.5V9h5.5" />
    <circle cx="16" cy="16" r="3.5" />
    <path d="m18.5 18.5 2 2" />
  </Svg>
);

/** A hand holding a coin. For funding and advertising disclosure. */
export const IconDisclosure = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M11 7.5h2" />
    <path d="M4 20.5v-3a2 2 0 0 1 2-2h3l2 1.5h3" />
    <path d="M14 17h3a2 2 0 0 1 0 4H4" />
  </Svg>
);

/** A filter funnel. */
export const IconFilter = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 5h17l-6.5 7.5v6l-4 2v-8z" />
  </Svg>
);

/** Two arrows facing each other. For a comparison. */
export const IconCompare = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5h11" />
    <path d="m11.5 5 3.5 3.5-3.5 3.5" />
    <path d="M20 15.5H9" />
    <path d="m12.5 12 -3.5 3.5 3.5 3.5" />
  </Svg>
);

/** A bar chart. For a rating breakdown. */
export const IconChart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20.5V3.5" />
    <path d="M4 20.5h17" />
    <path d="M8 17.5v-5" />
    <path d="M12.5 17.5v-9" />
    <path d="M17 17.5v-3" />
  </Svg>
);

/** A price tag with its hole. For a running offer. */
export const IconTag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11.5 3.5H19a1.5 1.5 0 0 1 1.5 1.5v7.5L11 21.5a1.5 1.5 0 0 1-2.1 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.1z" />
    <circle cx="16.25" cy="7.75" r="1.25" />
  </Svg>
);

/** A play triangle inside a frame. For a product tour or demo video. */
export const IconDemo = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
    <path d="M10.5 9.25 15 12l-4.5 2.75z" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Svg>
);

export const IconMinus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

/** A cup on a base, with the two handles. Marks the side that leads. */
export const IconTrophy = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p}>
    <path
      d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"
      fill={filled ? "currentColor" : "none"}
    />
    <path d="M7.5 5.5H5a2.5 2.5 0 0 0 2.5 2.5" />
    <path d="M16.5 5.5H19a2.5 2.5 0 0 1-2.5 2.5" />
    <path d="M12 13.5V17" />
    <path d="M8.5 20h7" />
    <path d="M9.5 20a2.5 2.5 0 0 1 5 0" />
  </Svg>
);

/** Registry used by the category grid. */
export const CATEGORY_ICONS = {
  ledger: IconLedger,
  payslip: IconPayslip,
  people: IconPeople,
  contact: IconContact,
  blocks: IconBlocks,
  board: IconBoard,
  package: IconPackage,
  receipt: IconReceipt,
} as const;

export type CategoryIconName = keyof typeof CATEGORY_ICONS;
