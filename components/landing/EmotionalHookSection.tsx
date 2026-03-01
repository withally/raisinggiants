import { ff, ffSerif, p } from "@/lib/landing/palette";

export function EmotionalHookSection() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p
          className="text-3xl md:text-4xl lg:text-5xl leading-snug tracking-tight mb-8 max-w-2xl"
          style={{
            fontFamily: ffSerif,
            fontStyle: "italic",
            fontWeight: 400,
            color: p.pink.dark,
          }}
        >
          &ldquo;The patterns from your childhood don&apos;t disappear. They just become
          invisible.&rdquo;
        </p>
        <p
          className="text-base leading-relaxed max-w-lg"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          Most of us sense something familiar in how we respond to stress, to love, to conflict. We
          can feel the shape of it — but we&apos;ve never had the language to name it. The Mirror
          gives you that language. Not as diagnosis. As recognition.
        </p>
      </div>
    </section>
  );
}
