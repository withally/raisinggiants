"use client";

import { useState } from "react";
import { ff } from "@/lib/landing/palette";

interface BlueprintEmailGateProps {
  sessionId: string;
  onVerified: () => void;
}

export function BlueprintEmailGate({ sessionId, onVerified }: BlueprintEmailGateProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/bp-verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, email: email.trim() }),
      });

      if (res.ok) {
        const data = (await res.json()) as { verified: boolean };
        if (data.verified) {
          onVerified();
          return;
        }
      }

      // 403 or verified: false
      setError(
        "That email doesn't match our records. Please use the email you took the quiz with.",
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#FAFAF7] px-6">
      <div className="w-full max-w-lg">
        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] px-8 py-10">
          {/* Eyebrow */}
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: ff, fontWeight: 600, color: "#002833" }}
          >
            The Blueprint
          </p>

          {/* Headline */}
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#1A1008] mb-3 leading-snug"
            style={{ fontFamily: ff }}
          >
            Enter your email to view your results
          </h2>

          {/* Sub-copy */}
          <p className="text-[#8A7A66] mb-8 leading-relaxed" style={{ fontFamily: ff }}>
            We use this to verify your access. Enter the email you used when you took the quiz.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="bp-gate-email" className="sr-only">
                Email address
              </label>
              <input
                id="bp-gate-email"
                type="text"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-[#E8E4DF] bg-white px-4 py-3 text-base text-[#1A1008] placeholder:text-[#C4BBAF] focus:outline-none focus:ring-2 focus:ring-[#002833]/20 focus:border-[#002833] disabled:opacity-50 transition-colors"
                style={{ fontFamily: ff }}
                aria-describedby={error ? "bp-gate-error" : undefined}
              />
              {error && (
                <p
                  id="bp-gate-error"
                  className="mt-2 text-sm text-red-500"
                  role="alert"
                  style={{ fontFamily: ff }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full rounded-xl bg-[#002833] hover:bg-[#003d4d] text-[#F0EDE8] font-semibold py-4 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: ff }}
            >
              {isLoading ? "Verifying..." : "View My Results"}
            </button>
          </form>
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-center text-xs text-[#8A7A66]" style={{ fontFamily: ff }}>
          We only use your email to verify access. No spam, ever.
        </p>
      </div>
    </div>
  );
}
