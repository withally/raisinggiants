"use client";

import { useState } from "react";

interface WhyWeAskThisProps {
  text: string;
}

export function WhyWeAskThis({ text }: WhyWeAskThisProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm text-[#8A7A66] underline underline-offset-2 hover:text-[#1A1008] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3D3A] focus-visible:ring-offset-2 rounded"
        aria-expanded={isOpen}
      >
        Why do we ask this?
      </button>

      {/* CSS grid trick for smooth height animation: 0fr -> 1fr */}
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pt-3 pb-1 text-sm text-[#8A7A66] leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
