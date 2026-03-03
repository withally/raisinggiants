import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E8E4DF] bg-[#FAFAF7]">
      <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8A7A66]">
        <p>&copy; {new Date().getFullYear()} Kin. All rights reserved.</p>
        <nav className="flex gap-6" aria-label="Legal">
          <Link href="/privacy" className="hover:text-[#1A1A1A] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1A1A1A] transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
