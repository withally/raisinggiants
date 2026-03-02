"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";
import { ScrollReveal } from "./ScrollReveal";

const pills = [
  { label: "Free", bg: p.pink.light, color: p.pink.dark },
  { label: "15 min", bg: p.mint.light, color: p.mint.dark },
  { label: "Research-backed", bg: p.blue.light, color: p.blue.dark },
];

const stats = [
  { n: 100, label: "Research articles", bg: grad.mint.light, color: p.mint.dark, suffix: "+" },
  { n: 11, label: "Dimensions analyzed", bg: grad.blue.light, color: p.blue.dark },
];

const TESTIMONIALS = [
  { quote: "I always sensed this about how I was raised. Now I finally have language for it.", name: "Sarah",   detail: "34, teacher",      photo: "/images/testimonial-sarah.jpg"   },
  { quote: "15 minutes. That's all it took to understand something I've spent 15 years avoiding.",              name: "Jake",    detail: "36, writer",       photo: "/images/testimonial-jake.jpg"    },
  { quote: "I've been in therapy for years and this captured something we'd been circling around for months.",  name: "Priya",   detail: "29, grad student", photo: "/images/testimonial-priya.jpg"   },
  { quote: "I sent this to my sister. We spent three hours on the phone that night talking about mum.",         name: "Michael", detail: "41, designer",     photo: "/images/testimonial-michael.jpg" },
  { quote: "I didn't expect a free tool to be this accurate. The watchouts section was uncomfortable in the best way.", name: "Aisha", detail: "31, psychologist", photo: "/images/testimonial-aisha.jpg" },
];

const colorDots = [p.pink.light, p.mint.light, p.butter.light, p.blue.light];

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    start.current = null;
    function tick(ts: number) {
      if (start.current === null) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return value;
}

function StatCard({ n, label, bg, color, suffix }: { n: number; label: string; bg: string; color: string; suffix?: string }) {
  const displayed = useCountUp(n, 1000);
  return (
    <div
      className="px-6 py-6 flex flex-col justify-between"
      style={{ background: bg, borderRadius: "24px", boxShadow: shadow.card }}
    >
      <p className="text-4xl leading-none mb-3" style={{ fontFamily: ff, fontWeight: 800, color }}>
        {displayed}{suffix}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ fontFamily: ff, fontWeight: 400, color, opacity: 0.6 }}
      >
        {label}
      </p>
    </div>
  );
}

function TestimonialCard() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
        setFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <div
      className="h-full px-8 py-8 flex flex-col justify-center gap-6"
      style={{
        background: grad.pink.light,
        borderRadius: "24px",
        boxShadow: shadow.card,
      }}
    >
      <p
        className="text-xl md:text-2xl leading-snug"
        style={{
          fontFamily: ffSerif,
          fontStyle: "italic",
          color: p.pink.dark,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Person row */}
      <div
        className="flex items-center gap-3"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        {/* Avatar */}
        <div
          className="shrink-0"
          style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: `2px solid ${p.pink.dark}22` }}
        >
          <Image src={t.photo} alt={t.name} width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        </div>
        <div>
          <p style={{ fontFamily: ff, fontWeight: 600, fontSize: "0.8125rem", color: p.pink.dark }}>
            {t.name}
          </p>
          <p style={{ fontFamily: ff, fontWeight: 400, fontSize: "0.6875rem", color: p.pink.dark, opacity: 0.5 }}>
            {t.detail}
          </p>
        </div>
        {/* Dot indicator */}
        <div className="flex gap-1 ml-auto">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 16 : 5,
                height: 5,
                borderRadius: "100px",
                backgroundColor: p.pink.dark,
                opacity: i === index ? 0.5 : 0.15,
                transition: "width 0.3s ease, opacity 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative z-10 px-4 md:px-10 pb-6 pt-2">
      <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
        {/* Left — butter hero card */}
        <ScrollReveal
          className="col-span-12 lg:col-span-7"
          offset={20}
          delay={0}
        >
          <div
            className="h-full px-8 md:px-12 py-10 md:py-14 flex flex-col justify-between"
            style={{
              background: grad.butter.light,
              borderRadius: "24px",
              boxShadow: shadow.card,
            }}
          >
            <div>
              <div className="flex gap-2 mb-10 flex-wrap">
                {pills.map((pill) => (
                  <span
                    key={pill.label}
                    className="px-4 py-1.5 text-xs"
                    style={{
                      fontFamily: ff,
                      fontWeight: 600,
                      backgroundColor: pill.bg,
                      color: pill.color,
                      borderRadius: "100px",
                    }}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl leading-[0.92] tracking-tight">
                <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>Finally</span>
                <br />
                <span
                  style={{
                    fontFamily: ffSerif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: p.pink.dark,
                  }}
                >
                  see what
                </span>
                <br />
                <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>
                  shaped you.
                </span>
              </h1>
            </div>

            <div className="mt-10">
              <p
                className="text-sm leading-relaxed mb-6 max-w-sm"
                style={{ fontFamily: ff, color: p.butter.dark, opacity: 0.55 }}
              >
                Understand how the parenting you received shapes who you are today.
              </p>

              {/* Button + avatar stack */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <Link href="/quiz">
                  <span
                    className="hover-btn px-8 py-4 text-sm cursor-pointer inline-flex items-center"
                    style={{
                      fontFamily: ff,
                      fontWeight: 700,
                      backgroundColor: p.blue.dark,
                      color: "#F0EDE8",
                      borderRadius: "16px",
                      minHeight: "44px",
                      boxShadow: shadow.button,
                    }}
                  >
                    Take The Mirror
                  </span>
                </Link>

                {/* Avatar stack + count */}
                <div className="flex items-center gap-2.5">
                  <div className="flex">
                    {[
                      "/images/avatar-sarah.jpg",
                      "/images/avatar-michael.jpg",
                      "/images/avatar-priya.jpg",
                      "/images/avatar-emma.jpg",
                    ].map((src, i) => (
                      <div
                        key={src}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: "2px solid #F5F2EA",
                          overflow: "hidden",
                          marginLeft: i === 0 ? 0 : -20,
                          position: "relative",
                          zIndex: 4 - i,
                          flexShrink: 0,
                        }}
                      >
                        <Image src={src} alt="" width={28} height={28} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                      </div>
                    ))}
                  </div>
                  <p
                    className="text-xs leading-tight"
                    style={{ fontFamily: ff, fontWeight: 500, color: p.butter.dark, opacity: 0.6 }}
                  >
                    100,000+ have taken it
                  </p>
                </div>
              </div>

              {/* Trust chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {["No account needed", "Results in 15 min", "Completely free"].map((chip, i) => (
                  <Fragment key={chip}>
                    <span
                      className="text-xs"
                      style={{ fontFamily: ff, fontWeight: 400, color: p.butter.dark, opacity: 0.45 }}
                    >
                      {chip}
                    </span>
                    {i < 2 && (
                      <span
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          backgroundColor: p.butter.dark,
                          opacity: 0.25,
                          display: "inline-block",
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — pastel cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
          {/* Testimonial — pink */}
          <ScrollReveal className="flex-1" offset={20} delay={120}>
            <TestimonialCard />
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal offset={20} delay={200}>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </ScrollReveal>

          {/* Footer — dark */}
          <ScrollReveal offset={16} delay={280}>
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{
                background: grad.dark,
                borderRadius: "24px",
                boxShadow: shadow.cardDark,
              }}
            >
              <div>
                <p
                  className="text-xs mb-0.5"
                  style={{ fontFamily: ff, fontWeight: 600, color: "#F0EDE8" }}
                >
                  The Mirror by Kin
                </p>
                <p className="text-[10px]" style={{ fontFamily: ff, color: "#666" }}>
                  Digital tools for parents who want to understand themselves.
                </p>
              </div>
              <div className="flex gap-1.5">
                {colorDots.map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
