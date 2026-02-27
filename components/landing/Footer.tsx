export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D3D3A] py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#F5F4F2]/80">Kin</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="text-xs text-[#7A9E9C] hover:text-[#F5F4F2] transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs text-[#7A9E9C] hover:text-[#F5F4F2] transition-colors">
            Terms of Service
          </a>
          <a href="mailto:hello@raisinggiants.com" className="text-xs text-[#7A9E9C] hover:text-[#F5F4F2] transition-colors">
            Contact
          </a>
        </div>
        <p className="text-xs text-[#7A9E9C]">&copy; {year} Kin. All rights reserved.</p>
      </div>
    </footer>
  );
}
