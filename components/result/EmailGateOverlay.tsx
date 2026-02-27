"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailGateOverlayProps {
  onDismiss: () => void;
}

export function EmailGateOverlay({ onDismiss }: EmailGateOverlayProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  function onFormSubmit(_values: EmailFormValues) {
    // Gate is purely UI — no network call, no Supabase write.
    // Email was already captured during quiz completion.
    onDismiss();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Reveal your result"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F4F2]/95 backdrop-blur-sm px-6"
    >
      <div className="w-full max-w-lg">
        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] px-8 py-10">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.25em] uppercase text-[#8A7A66] font-medium mb-4">
            The Mirror
          </p>

          {/* Headline */}
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#1A1008] mb-3 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your result is ready.
          </h2>

          {/* Sub-copy */}
          <p className="text-[#8A7A66] mb-8 leading-relaxed">
            We&apos;ve prepared a personalised report about the parenting you received. Enter your
            email to reveal it.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <div className="mb-4">
              <label htmlFor="gate-email" className="sr-only">
                Email address
              </label>
              <Input
                id="gate-email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoCapitalize="none"
                autoFocus
                className="w-full text-base py-3 h-auto"
                aria-describedby={errors.email ? "gate-email-error" : undefined}
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email && (
                <p id="gate-email-error" className="mt-2 text-sm text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0D3D3A] hover:bg-[#0F4F4B] text-white font-semibold py-4 h-auto text-base rounded-xl transition-colors"
            >
              {isSubmitting ? "Revealing..." : "Reveal My Result"}
            </Button>
          </form>
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-center text-xs text-[#8A7A66]">
          We only use your email to send your result. No spam, ever.
        </p>
      </div>
    </div>
  );
}
