"use client";

import { StickyBlueprintBar } from "@/components/result/StickyBlueprintBar";

interface ResultPageClientProps {
  children: React.ReactNode;
}

export function ResultPageClient({ children }: ResultPageClientProps) {
  return (
    <>
      {children}
      <StickyBlueprintBar hidden={false} />
    </>
  );
}
