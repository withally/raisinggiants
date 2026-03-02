import Link from "next/link";
import { ff, p, shadow } from "@/lib/landing/palette";

interface InlineCTAProps {
  /** Text shown above the button */
  text?: string;
  /** Button label */
  label?: string;
}

export function InlineCTA({
  text = "Ready to find out?",
  label = "Take The Mirror",
}: InlineCTAProps) {
  return (
    <div className="py-10 md:py-14 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <p
          className="text-sm"
          style={{ fontFamily: ff, fontWeight: 500, color: "#999" }}
        >
          {text}
        </p>
        <Link
          href="/quiz"
          className="hover-btn inline-flex cursor-pointer items-center justify-center px-7 py-3.5 text-sm"
          style={{
            fontFamily: ff,
            fontWeight: 700,
            backgroundColor: p.blue.dark,
            color: "#F0EDE8",
            borderRadius: "100px",
            minHeight: "44px",
            boxShadow: shadow.button,
          }}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
