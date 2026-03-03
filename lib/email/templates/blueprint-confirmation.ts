export const BLUEPRINT_SUBJECT = "You're on the Blueprint waitlist";

export function blueprintConfirmationTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#FAFAF7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1A1A1A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF7;">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <!-- Header -->
        <tr><td style="padding-bottom:32px;">
          <p style="font-size:14px;letter-spacing:0.15em;text-transform:uppercase;color:#8A7A66;margin:0;">Kin</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding-bottom:24px;">
          <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;margin:0 0 16px;line-height:1.3;">
            You're on the list.
          </h1>
          <p style="font-size:16px;line-height:1.6;color:#555;margin:0 0 16px;">
            Thank you for your interest in The Blueprint — a personalised guide to bridge what you
            inherited with what you want to build.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#555;margin:0 0 16px;">
            We're building something grounded in real research, tailored to the patterns
            you discovered in The Mirror. We'll reach out as soon as it's ready.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#555;margin:0;">
            In the meantime, your Mirror result is always there for you whenever you want to revisit it.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="border-top:1px solid #E8E4DF;padding-top:24px;">
          <p style="font-size:12px;line-height:1.6;color:#AAA;margin:0;">
            You're receiving this because you joined The Blueprint waitlist on
            <a href="https://meetkin.com" style="color:#8A7A66;">meetkin.com</a>.
            We'll never share or sell your information.
            <a href="https://meetkin.com/privacy" style="color:#8A7A66;">Privacy Policy</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
