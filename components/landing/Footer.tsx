export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#00363A] py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-extrabold font-display text-[#F5F4F2]/80">Kin</p>
        <div className="flex items-center gap-6">
          <a
            href="/privacy"
            className="text-xs text-[#7AAFA0] hover:text-[#F5F4F2] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-xs text-[#7AAFA0] hover:text-[#F5F4F2] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="mailto:hello@raisinggiants.com"
            className="text-xs text-[#7AAFA0] hover:text-[#F5F4F2] transition-colors"
          >
            Contact
          </a>
        </div>
        <p className="text-xs text-[#7AAFA0]/60">
          &copy; {year} Kin
        </p>
      </div>
    </footer>
  );
}
