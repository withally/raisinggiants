"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface BlueprintEmailFormProps {
  source?: "blueprint-page" | "result-page" | "sticky-bar";
}

export function BlueprintEmailForm({ source = "blueprint-page" }: BlueprintEmailFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  async function onFormSubmit(values: EmailFormValues) {
    setServerError(null);

    try {
      const res = await fetch("/api/blueprint-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, source }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Unable to connect. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <output
        className="block rounded-2xl bg-amber-100 border border-amber-200 px-8 py-8 text-center"
        aria-live="polite"
      >
        <div className="mb-3 flex justify-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/30">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="text-amber-700"
            >
              <path
                d="M4 10l4 4 8-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <p
          className="text-stone-800 font-semibold text-lg mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You&apos;re on the list.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          We&apos;ll notify you when The Blueprint launches.
        </p>
      </output>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="blueprint-email" className="sr-only">
          Email address
        </label>
        <Input
          id="blueprint-email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoCapitalize="none"
          className="w-full text-base py-3 h-auto"
          aria-describedby={errors.email ? "blueprint-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="blueprint-email-error" className="mt-2 text-sm text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500" role="alert">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 h-auto text-base rounded-xl transition-colors cursor-pointer"
      >
        {isSubmitting ? "Saving..." : "Notify me when it launches"}
      </Button>

      <p className="text-center text-xs text-stone-400">
        No spam. We&apos;ll only contact you about The Blueprint launch.
      </p>
    </form>
  );
}
