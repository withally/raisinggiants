"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailCaptureScreenProps {
  onSubmit: (email: string) => void;
  isSubmitting?: boolean;
}

export function EmailCaptureScreen({ onSubmit, isSubmitting = false }: EmailCaptureScreenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  function onFormSubmit(values: EmailFormValues) {
    onSubmit(values.email);
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 py-8 bg-[#F5F4F2]">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] px-8 py-10">
          {/* Headline */}
          <h2
            className="text-2xl font-semibold text-[#1A1008] mb-2 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your reflection is complete.
          </h2>

          {/* Sub-text */}
          <p className="text-[#8A7A66] mb-8 leading-relaxed">
            Enter your email so we can send your results.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoCapitalize="none"
                className="w-full text-base py-3 h-auto"
                aria-label="Email address"
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0D3D3A] hover:bg-[#0F4F4B] text-white font-semibold py-4 h-auto text-base rounded-xl transition-colors"
            >
              {isSubmitting ? "Saving..." : "See My Results"}
            </Button>
          </form>
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-center text-xs text-[#8A7A66]">
          We&apos;ll only use your email to send your results. No spam, ever.
          <br />
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[#1A1008] transition-colors">
            Read our privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
}
