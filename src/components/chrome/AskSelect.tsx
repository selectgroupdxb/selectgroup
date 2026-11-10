"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/cn";

const SUGGESTED_PROMPTS = [
  "What is available in Dubai Marina?",
  "Explain the payment plans",
  "Arrange a viewing",
];

type AskSelectProps = {
  visible: boolean;
};

/** Concept only — no backend. A floating assistant entry point per the handoff spec. */
export function AskSelect({ visible }: AskSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 transition-opacity duration-320 desktop:right-10 desktop:bottom-10",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {open ? (
        <div className="w-[min(320px,calc(100vw-40px))] border border-sg-grey-5 bg-white p-6 shadow-modal">
          <p className="mb-4 font-display text-card-title tracking-display text-sg-black uppercase">Ask Select</p>
          <ul className="flex flex-col gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <li key={prompt}>
                <button
                  type="button"
                  className="min-h-11 w-full border border-sg-grey-4 px-4 py-2 text-left text-body-sm text-sg-grey-1 transition-colors duration-180 hover:border-sg-pacific hover:text-sg-pacific"
                >
                  {prompt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close Ask Select" : "Open Ask Select"}
        className="flex h-14 w-14 items-center justify-center rounded-pill bg-sg-black text-white shadow-modal transition-colors duration-180 hover:bg-sg-pacific"
      >
        {open ? <X size={22} strokeWidth={1.5} /> : <MessageCircle size={22} strokeWidth={1.5} />}
      </button>
    </div>
  );
}
