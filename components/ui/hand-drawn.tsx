interface HandDrawnProps {
  className?: string;
  color?: string;
}

/** Full-width wavy line divider — replaces mechanical border-t / border-b */
export function HandDrawnDivider({ className = "", color = "currentColor" }: HandDrawnProps) {
  return (
    <svg
      viewBox="0 0 800 8"
      fill="none"
      preserveAspectRatio="none"
      className={`w-full h-2 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 4C40 2.5 80 5.5 120 4C160 2.2 200 5.8 240 3.8C280 1.8 320 6.2 360 4.2C400 2 440 5.6 480 3.6C520 1.6 560 6.4 600 4.4C640 2.4 680 5.2 720 3.4C760 1.4 800 5 800 4"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Organic open-quote mark for testimonials */
export function HandDrawnQuoteMark({ className = "", color = "currentColor" }: HandDrawnProps) {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 18C2.5 14.5 2 11 3.5 7.5C5 4.2 8 2 12 1.5C12.3 1.5 12.5 1.7 12.3 2C10.5 4.5 9.5 7 9.8 10C10 12 11 13 12.5 13.5C13.8 13.8 14.2 15 13.5 16.2C12.5 18 10 19.5 7 19C5.5 18.8 4.5 18.5 4 18Z"
        fill={color}
      />
      <path
        d="M20 18C18.5 14.5 18 11 19.5 7.5C21 4.2 24 2 28 1.5C28.3 1.5 28.5 1.7 28.3 2C26.5 4.5 25.5 7 25.8 10C26 12 27 13 28.5 13.5C29.8 13.8 30.2 15 29.5 16.2C28.5 18 26 19.5 23 19C21.5 18.8 20.5 18.5 20 18Z"
        fill={color}
      />
    </svg>
  );
}

/** Decorative accent circle — intentionally imperfect */
export function HandDrawnCircle({ className = "", color = "currentColor", size = 24 }: HandDrawnProps & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5C6.8 2.2 2.5 6.5 2.2 11.8C1.9 17 6 21.8 11.5 21.5C17 21.2 21.5 17 21.8 11.5C22.1 6.2 17.5 2.8 12 2.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
