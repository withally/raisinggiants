export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-semibold text-stone-300">Raising Giants</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Terms of Service
          </a>
          <a href="mailto:hello@raisinggiants.com" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Contact
          </a>
        </div>
        <p className="text-xs text-stone-600">&copy; {year} Raising Giants. All rights reserved.</p>
      </div>
    </footer>
  );
}
