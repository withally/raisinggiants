import Link from "next/link";
import { ff, p } from "@/lib/landing/palette";

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
      <span className="text-xl tracking-tight" style={{ fontFamily: ff, fontWeight: 800 }}>
        Kin
      </span>
      <div
        className="hidden md:flex items-center gap-1 px-1.5 py-1.5"
        style={{
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          borderRadius: "100px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {(["The Mirror", "About"] as const).map((item, i) => (
          <span
            key={item}
            className="px-4 py-2 text-xs"
            style={{
              fontFamily: ff,
              fontWeight: 500,
              color: i === 0 ? "#1A1A1A" : "#999",
              backgroundColor: i === 0 ? "#fff" : "transparent",
              borderRadius: "100px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <Link href="/quiz">
        <span
          className="px-6 py-2.5 text-xs cursor-pointer inline-block"
          style={{
            fontFamily: ff,
            fontWeight: 700,
            backgroundColor: p.blue.dark,
            color: "#F0EDE8",
            borderRadius: "100px",
            minHeight: "44px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Start free
        </span>
      </Link>
    </nav>
  );
}
