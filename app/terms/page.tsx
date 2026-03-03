import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Kin and The Mirror quiz.",
};

export default function TermsPage() {
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

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-[#8A7A66] mb-10">Last updated: March 2, 2026</p>

        <div className="prose-sm space-y-8 text-[#444] leading-relaxed [&_h2]:text-[#1A1A1A] [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3">
          <section>
            <h2>1. Service description</h2>
            <p>
              Kin (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides The Mirror, a
              free online quiz that helps parents explore parenting patterns they may have inherited.
              The Blueprint is a forthcoming paid product offering personalised guidance. By using our
              website at meetkin.com, you agree to these Terms of Service.
            </p>
          </section>

          <section>
            <h2>2. Not medical or therapeutic advice</h2>
            <p>
              Our tools are <strong>educational and reflective in nature</strong>. The Mirror quiz and
              its results are informed by published research in attachment theory, family systems, and
              developmental psychology, but they do <strong>not</strong> constitute medical advice,
              psychological diagnosis, or therapy. They are not a substitute for professional mental
              health care. If you are experiencing distress, please consult a qualified professional.
            </p>
          </section>

          <section>
            <h2>3. User accounts and data</h2>
            <p>
              You provide your email address to start the quiz and may provide it again to join The
              Blueprint waitlist. You are responsible for providing an accurate email address. See
              our{" "}
              <Link href="/privacy" className="text-[#002833] underline">
                Privacy Policy
              </Link>{" "}
              for details on how we handle your data.
            </p>
          </section>

          <section>
            <h2>4. Intellectual property</h2>
            <p>
              All content on meetkin.com &mdash; including text, graphics, quiz questions, archetype
              descriptions, and underlying algorithms &mdash; is owned by Kin or its licensors and is
              protected by copyright and intellectual property laws. You may not reproduce,
              distribute, or create derivative works from our content without written permission.
            </p>
          </section>

          <section>
            <h2>5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use automated tools to scrape or bulk-access our services.</li>
              <li>Attempt to reverse-engineer our scoring algorithms.</li>
              <li>Misrepresent quiz results as clinical assessments or diagnoses.</li>
              <li>Use the service for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2>6. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Kin shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, including but not limited to
              loss of profits, data, or goodwill, arising out of or in connection with your use of
              our services. Our total liability for any claim shall not exceed the amount you paid us
              in the 12 months preceding the claim (or $0 if using free services).
            </p>
          </section>

          <section>
            <h2>7. Disclaimer of warranties</h2>
            <p>
              Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, whether express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          <section>
            <h2>8. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of our services after
              changes are posted constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>9. Governing law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of California, United States, without regard to its conflict-of-law provisions.
            </p>
          </section>

          <section>
            <h2>10. Contact us</h2>
            <p>
              If you have questions about these Terms of Service, please email us at{" "}
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
