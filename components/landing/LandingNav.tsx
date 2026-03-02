"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ff, p, shadow } from "@/lib/landing/palette";

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Science", href: "#science" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on scroll */
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    },
    [],
  );

  return (
    <>
      {/* ─── Fixed nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="px-4 md:px-5 pt-3">
          <div
            className="mx-auto flex items-center justify-between pointer-events-auto"
            style={{
              maxWidth: scrolled ? "800px" : "1280px",
              backgroundColor: scrolled
                ? "rgba(255,255,255,0.92)"
                : "transparent",
              backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
              WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
              borderRadius: scrolled ? "100px" : "20px",
              boxShadow: scrolled
                ? "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)"
                : "none",
              padding: scrolled ? "5px 5px 5px 20px" : "10px 12px 10px 16px",
              border: scrolled
                ? "1px solid rgba(0,0,0,0.04)"
                : "1px solid transparent",
              transition: [
                "max-width 600ms cubic-bezier(0.16,1,0.3,1)",
                "background-color 400ms ease",
                "backdrop-filter 400ms ease",
                "-webkit-backdrop-filter 400ms ease",
                "border-radius 600ms cubic-bezier(0.16,1,0.3,1)",
                "box-shadow 400ms ease",
                "padding 500ms cubic-bezier(0.16,1,0.3,1)",
                "border-color 400ms ease",
              ].join(", "),
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="text-xl tracking-tight shrink-0"
              style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
            >
              Kin
            </Link>

            {/* Desktop nav links */}
            <div
              className="hidden md:flex items-center gap-0.5"
              style={{
                backgroundColor: scrolled
                  ? "transparent"
                  : "rgba(255,255,255,0.6)",
                backdropFilter: scrolled ? "blur(0px)" : "blur(12px)",
                WebkitBackdropFilter: scrolled ? "blur(0px)" : "blur(12px)",
                borderRadius: "100px",
                border: scrolled
                  ? "1px solid transparent"
                  : "1px solid rgba(0,0,0,0.05)",
                padding: scrolled ? "0" : "4px",
                transition: [
                  "background-color 400ms ease",
                  "backdrop-filter 400ms ease",
                  "-webkit-backdrop-filter 400ms ease",
                  "border-color 400ms ease",
                  "padding 400ms ease",
                ].join(", "),
              }}
            >
              {navLinks.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-4 py-2 text-xs rounded-full"
                    style={{
                      fontFamily: ff,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#1A1A1A" : "#777",
                      backgroundColor: isActive
                        ? "rgba(0,0,0,0.06)"
                        : "transparent",
                      transition:
                        "background-color 200ms ease, color 200ms ease, font-weight 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)";
                        e.currentTarget.style.color = "#333";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#777";
                      }
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link href="/quiz" className="hidden md:block">
                <span
                  className="hover-btn px-5 py-2 text-xs cursor-pointer inline-flex items-center"
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    backgroundColor: p.blue.dark,
                    color: "#F0EDE8",
                    borderRadius: "100px",
                    minHeight: scrolled ? "36px" : "40px",
                    boxShadow: shadow.button,
                    transition:
                      "min-height 500ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  Start free
                </span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden relative w-10 h-10 rounded-full"
                style={{
                  backgroundColor: scrolled
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(255,255,255,0.6)",
                  transition: "background-color 300ms ease",
                }}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "11px",
                    width: "18px",
                    height: "2px",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "1px",
                    top: mobileOpen ? "19px" : "13px",
                    transform: mobileOpen
                      ? "rotate(45deg)"
                      : "rotate(0deg)",
                    transition: "top 300ms ease, transform 300ms ease",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "19px",
                    width: "18px",
                    height: "2px",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "1px",
                    opacity: mobileOpen ? 0 : 1,
                    transition: "opacity 200ms ease",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "11px",
                    width: "18px",
                    height: "2px",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "1px",
                    top: mobileOpen ? "19px" : "25px",
                    transform: mobileOpen
                      ? "rotate(-45deg)"
                      : "rotate(0deg)",
                    transition: "top 300ms ease, transform 300ms ease",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile menu overlay ─── */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity: mobileOpen ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.12)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute left-4 right-4 p-2"
          style={{
            top: "68px",
            backgroundColor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.06)",
            transform: mobileOpen ? "translateY(0)" : "translateY(-12px)",
            transition:
              "transform 300ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3.5 rounded-2xl text-sm"
                style={{
                  fontFamily: ff,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#1A1A1A" : "#555",
                  backgroundColor: isActive ? "rgba(0,0,0,0.05)" : "transparent",
                  transition: "background-color 200ms ease, color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {item.label}
              </a>
            );
          })}
          <div
            className="mt-1 mx-2 pt-3 pb-2"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <Link href="/quiz" onClick={() => setMobileOpen(false)}>
              <span
                className="hover-btn w-full px-6 py-3.5 text-sm cursor-pointer flex items-center justify-center"
                style={{
                  fontFamily: ff,
                  fontWeight: 700,
                  backgroundColor: p.blue.dark,
                  color: "#F0EDE8",
                  borderRadius: "14px",
                  boxShadow: shadow.button,
                }}
              >
                Start free
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div style={{ height: "72px" }} />
    </>
  );
}
