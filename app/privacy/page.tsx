import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Kin collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAFAF7] text-[#1A1A1A]">
      <main className="flex-1 mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-[#8A7A66] hover:text-[#1A1A1A] transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Kin
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#8A7A66] mb-10">Last updated: March 2, 2026</p>

        <div className="prose-sm space-y-8 text-[#444] leading-relaxed [&_h2]:text-[#1A1A1A] [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3">
          <section>
            <h2>Who we are</h2>
            <p>
              Kin (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates meetkin.com.
              We build digital tools that help parents understand the patterns they inherited from
              their own upbringing.
            </p>
          </section>

          <section>
            <h2>What data we collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Email address</strong> &mdash; provided when you start The Mirror quiz or
                join The Blueprint waitlist. Used to save your results and send transactional emails.
              </li>
              <li>
                <strong>Quiz answers</strong> &mdash; your responses to The Mirror&rsquo;s
                reflective questions. Used to compute your parenting archetype result.
              </li>
              <li>
                <strong>Analytics data</strong> &mdash; if you consent to cookies, we use Google
                Analytics 4 (GA4) and Meta Pixel to understand how visitors use the site (e.g., page
                views, button clicks). These services may set cookies. No analytics scripts are loaded
                unless you explicitly accept cookies.
              </li>
              <li>
                <strong>UTM parameters</strong> &mdash; if you arrive via a marketing link, we store
                campaign attribution data (source, medium, campaign) alongside your email to
                understand which channels are effective.
              </li>
            </ul>
          </section>

          <section>
            <h2>How we store your data</h2>
            <p>
              Your data is stored in a <strong>Supabase</strong> database with row-level security
              policies. Supabase infrastructure is hosted on AWS in the United States.
            </p>
          </section>

          <section>
            <h2>How we use your data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To compute and display your quiz result.</li>
              <li>To send transactional emails via <strong>Resend</strong> (e.g., quiz confirmation, Blueprint waitlist notification).</li>
              <li>To improve our product and understand how visitors use the site (only with your consent).</li>
            </ul>
          </section>

          <section>
            <h2>We never sell your data</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Period.
            </p>
          </section>

          <section>
            <h2>Third-party services</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> &mdash; database and authentication infrastructure.</li>
              <li><strong>Resend</strong> &mdash; transactional email delivery.</li>
              <li><strong>Google Analytics 4</strong> &mdash; website analytics (consent-gated).</li>
              <li><strong>Meta Pixel</strong> &mdash; advertising attribution (consent-gated).</li>
              <li><strong>Vercel</strong> &mdash; hosting and deployment.</li>
            </ul>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We only set analytics cookies if you explicitly accept them via our cookie consent
              banner. If you decline, no tracking cookies are set and no analytics scripts are loaded.
              Essential cookies (e.g., localStorage for quiz progress) do not require consent.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any
              time by emailing us at the address below. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2>Children&rsquo;s privacy</h2>
            <p>
              Our service is intended for adults (parents and prospective parents). We do not
              knowingly collect data from anyone under 18 years of age.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with
              an updated &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2>Contact us</h2>
            <p>
              If you have questions about this Privacy Policy, please email us at{" "}
              <a href="mailto:hello@meetkin.com" className="text-[#002833] underline">
                hello@meetkin.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
