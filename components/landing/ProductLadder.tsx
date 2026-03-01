import Link from "next/link";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

export function ProductLadder() {
  return (
    <section style={{ backgroundColor: "#FAFAF7" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28">
        {/* Section label */}
        <p
          className="mb-3 text-xs uppercase tracking-widest"
          style={{ fontFamily: ff, fontWeight: 600, color: "#888" }}
        >
          What you get
        </p>

        {/* Section heading */}
        <h2
          className="mb-12 max-w-lg text-3xl md:text-4xl"
          style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
        >
          Three tools for{" "}
          <em
            style={{
              fontFamily: ffSerif,
              fontWeight: 400,
              fontStyle: "italic",
              color: p.pink.dark,
            }}
          >
            understanding yourself
          </em>
        </h2>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Mirror card — most prominent */}
          <div
            key="mirror"
            className="hover-lift flex flex-col"
            style={{
              background: grad.butter.light,
              borderRadius: 24,
              padding: "2rem",
              boxShadow: shadow.card,
            }}
          >
            {/* Status badge */}
            <span
              className="mb-6 inline-block self-start rounded-full px-3 py-1 text-xs"
              style={{
                fontFamily: ff,
                fontWeight: 600,
                backgroundColor: p.mint.light,
                color: p.mint.dark,
              }}
            >
              Free — Available now
            </span>

            <h3
              className="mb-3 text-2xl"
              style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
            >
              The Mirror
            </h3>

            <p
              className="mb-8 flex-1 text-base leading-relaxed"
              style={{ fontFamily: ff, fontWeight: 400, color: "#444" }}
            >
              Understand how the parenting you received shapes who you are today.
            </p>

            <Link
              href="/quiz"
              className="hover-btn inline-flex cursor-pointer items-center justify-center px-6 text-sm"
              style={{
                fontFamily: ff,
                fontWeight: 700,
                backgroundColor: p.blue.dark,
                color: "#fff",
                borderRadius: 16,
                minHeight: 44,
                boxShadow: shadow.button,
              }}
            >
              Take The Mirror
            </Link>
          </div>

          {/* Blueprint card — coming soon */}
          <div
            key="blueprint"
            className="flex flex-col opacity-70"
            style={{
              background: "linear-gradient(180deg, #F7F7F4 0%, #F0F0EC 100%)",
              borderRadius: 24,
              padding: "2rem",
              boxShadow: shadow.card,
            }}
          >
            {/* Status badge */}
            <span
              className="mb-6 inline-block self-start rounded-full px-3 py-1 text-xs"
              style={{
                fontFamily: ff,
                fontWeight: 600,
                backgroundColor: "#E0E0DA",
                color: "#888",
              }}
            >
              Coming soon
            </span>

            <h3
              className="mb-3 text-2xl"
              style={{ fontFamily: ff, fontWeight: 700, color: "#555" }}
            >
              The Blueprint
            </h3>

            <p
              className="flex-1 text-base leading-relaxed"
              style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
            >
              A personalized guide to understanding and reshaping your patterns.
            </p>
          </div>

          {/* Partner Match card — future */}
          <div
            key="partner-match"
            className="flex flex-col opacity-50"
            style={{
              background: "linear-gradient(180deg, #FAFAF8 0%, #F5F5F2 100%)",
              borderRadius: 24,
              padding: "2rem",
              boxShadow: shadow.card,
            }}
          >
            {/* Status badge */}
            <span
              className="mb-6 inline-block self-start rounded-full px-3 py-1 text-xs"
              style={{
                fontFamily: ff,
                fontWeight: 600,
                backgroundColor: "#EBEBEA",
                color: "#AAA",
              }}
            >
              Future
            </span>

            <h3
              className="mb-3 text-2xl"
              style={{ fontFamily: ff, fontWeight: 700, color: "#888" }}
            >
              The Partner Match
            </h3>

            <p
              className="flex-1 text-base leading-relaxed"
              style={{ fontFamily: ff, fontWeight: 400, color: "#AAA" }}
            >
              See how your parenting patterns interact with your partner's.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
