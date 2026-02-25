export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-semibold text-stone-300">Raising Giants</p>
        <p className="text-xs text-stone-600">&copy; {year} Raising Giants. All rights reserved.</p>
      </div>
    </footer>
  );
}
