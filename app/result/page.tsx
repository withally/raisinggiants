import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Result | Raising Giants — The Mirror",
  description: "Discover the parenting patterns you inherited — your personalised Mirror result.",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-amber-50 px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-4">
          Your result
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your archetype is being prepared
        </h1>
        <p className="text-stone-600 leading-relaxed mb-3">
          We are building your full, personalised result page. It will include the parenting
          archetype that shaped you, the patterns you inherited, and tailored insights grounded in
          research.
        </p>
        {session && (
          <p className="text-sm text-stone-400 mb-8">
            Session: <span className="font-mono text-stone-500">{session.slice(0, 8)}...</span>
          </p>
        )}
        {!session && <div className="mb-8" />}
        <p className="text-stone-500 text-sm leading-relaxed mb-8">
          In the meantime, you can retake the quiz or return to the home page to learn more about
          the science behind The Mirror.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quiz"
            className="rounded-full bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Take the quiz again
          </Link>
          <Link
            href="/"
            className="text-stone-500 hover:text-stone-700 underline underline-offset-4 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
