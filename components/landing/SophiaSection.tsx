import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

export function SophiaSection() {
  return (
    <section style={{ backgroundColor: "#FAFAF7" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28">
        <div
          style={{
            background: grad.pink.light,
            borderRadius: 24,
            padding: "3rem 2.5rem",
            boxShadow: shadow.card,
          }}
          className="md:p-16"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            {/* Left: Text content */}
            <div className="flex-1">
              {/* Section label */}
              <p
                className="mb-3 text-xs uppercase tracking-widest"
                style={{ fontFamily: ff, fontWeight: 600, color: p.pink.dark, opacity: 0.7 }}
              >
                Who built this
              </p>

              {/* Heading */}
              <h2
                className="mb-6 text-3xl md:text-4xl"
                style={{ fontFamily: ff, fontWeight: 800, color: p.pink.dark }}
              >
                Built by someone who{" "}
                <em
                  style={{
                    fontFamily: ffSerif,
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: p.pink.dark,
                  }}
                >
                  gets it
                </em>
              </h2>

              {/* Body copy */}
              <p
                className="mb-6 text-base leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.85 }}
              >
                Sophia is a clinical psychologist specializing in attachment theory and family
                systems. She has spent years helping adults understand not just who they are, but
                how they became that way.
              </p>

              <p
                className="mb-6 text-base leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.85 }}
              >
                She built The Mirror because she experienced these patterns herself. Growing up, she
                sensed that something in how she was raised was shaping her — her instincts, her
                relationships, the way she showed up for people she loved. It took years of clinical
                training to find the language for what she already knew.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.85 }}
              >
                She wanted everyone to have that language. Not after years of therapy — but in
                fifteen minutes, for free.
              </p>
            </div>

            {/* Right: Styled initial placeholder */}
            <div className="flex flex-shrink-0 flex-col items-center md:items-end">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `linear-gradient(180deg, #5E2B56 0%, ${p.pink.dark} 100%)`,
                  marginBottom: "1.25rem",
                  boxShadow: "0 4px 20px rgba(74, 25, 66, 0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: ff,
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: p.pink.light,
                    lineHeight: 1,
                  }}
                >
                  S
                </span>
              </div>

              <p
                className="text-center text-sm"
                style={{ fontFamily: ff, fontWeight: 700, color: p.pink.dark }}
              >
                Sophia
              </p>
              <p
                className="text-center text-xs"
                style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.7 }}
              >
                Clinical Psychologist
              </p>
              <p
                className="mt-1 text-center text-xs"
                style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.6 }}
              >
                Attachment Theory & Family Systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
