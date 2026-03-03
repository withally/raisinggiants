import { FROM_EMAIL, resend } from "./client";
import { WELCOME_SUBJECT, welcomeTemplate } from "./templates/welcome";
import {
  BLUEPRINT_SUBJECT,
  blueprintConfirmationTemplate,
} from "./templates/blueprint-confirmation";

export async function sendWelcomeEmail(to: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping welcome email");
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: WELCOME_SUBJECT,
    html: welcomeTemplate(),
  });

  if (error) {
    console.error("[email] Failed to send welcome email:", error);
  }
}

export async function sendBlueprintConfirmation(to: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping blueprint email");
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: BLUEPRINT_SUBJECT,
    html: blueprintConfirmationTemplate(),
  });

  if (error) {
    console.error("[email] Failed to send blueprint confirmation:", error);
  }
}
