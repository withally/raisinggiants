#!/usr/bin/env node

/**
 * Image generation via OpenRouter API.
 *
 * Usage:
 *   node scripts/generate-image.mjs "a watercolor anchor icon" -o public/icons/anchor.png
 *   node scripts/generate-image.mjs "a cute cat" --model google/gemini-2.5-flash-image-preview --aspect 1:1
 *
 * Options:
 *   -o, --output    Output file path (default: generated-<timestamp>.png)
 *   -m, --model     OpenRouter model ID (default: google/gemini-3-pro-image-preview)
 *   -a, --aspect    Aspect ratio (default: 1:1)
 *   -s, --size      Image size: 0.5K, 1K, 2K, 4K (default: 2K)
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DEFAULTS = {
  model: "google/gemini-3-pro-image-preview",
  aspect: "1:1",
  size: "2K",
};

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { ...DEFAULTS };
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-o" || arg === "--output") opts.output = args[++i];
    else if (arg === "-m" || arg === "--model") opts.model = args[++i];
    else if (arg === "-a" || arg === "--aspect") opts.aspect = args[++i];
    else if (arg === "-s" || arg === "--size") opts.size = args[++i];
    else if (arg === "-h" || arg === "--help") {
      console.log(
        [
          "Usage: generate-image.mjs <prompt> [options]",
          "",
          "Options:",
          "  -o, --output   Output file path (default: generated-<timestamp>.png)",
          "  -m, --model    Model ID (default: google/gemini-3-pro-image-preview)",
          "  -a, --aspect   Aspect ratio (default: 1:1)",
          "  -s, --size     Image size: 0.5K, 1K, 2K, 4K (default: 2K)",
        ].join("\n"),
      );
      process.exit(0);
    } else positional.push(arg);
  }

  opts.prompt = positional.join(" ");
  if (!opts.prompt) {
    console.error("Error: prompt is required");
    process.exit(1);
  }
  if (!opts.output) {
    opts.output = `generated-${Date.now()}.png`;
  }
  return opts;
}

async function generate(opts) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENROUTER_API_KEY not set in environment");
    process.exit(1);
  }

  console.log(`Model:   ${opts.model}`);
  console.log(`Prompt:  ${opts.prompt}`);
  console.log(`Aspect:  ${opts.aspect}`);
  console.log(`Size:    ${opts.size}`);
  console.log(`Output:  ${opts.output}`);
  console.log("Generating...");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180_000); // 3 min timeout

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: opts.model,
      messages: [{ role: "user", content: opts.prompt }],
      modalities: ["image", "text"],
      image_config: {
        aspect_ratio: opts.aspect,
        image_size: opts.size,
      },
      stream: false,
    }),
  });

  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text();
    console.error(`API error (${res.status}): ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  const message = data.choices?.[0]?.message;

  if (!message) {
    console.error("No message in response:", JSON.stringify(data, null, 2));
    process.exit(1);
  }

  // Extract image from response — could be in `images` array or inline base64 in content
  let base64Data = null;

  if (message.images?.length) {
    const url = message.images[0].image_url?.url || message.images[0].url;
    if (url?.startsWith("data:")) {
      base64Data = url.split(",")[1];
    }
  }

  // Some models return base64 inline in content
  if (!base64Data && typeof message.content === "string") {
    const match = message.content.match(
      /data:image\/(?:png|jpeg|webp);base64,([A-Za-z0-9+/=]+)/,
    );
    if (match) base64Data = match[1];
  }

  if (!base64Data) {
    console.error(
      "No image found in response. Full response:",
      JSON.stringify(data, null, 2),
    );
    process.exit(1);
  }

  mkdirSync(dirname(opts.output), { recursive: true });
  writeFileSync(opts.output, Buffer.from(base64Data, "base64"));

  if (message.content && typeof message.content === "string") {
    const text = message.content
      .replace(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g, "")
      .trim();
    if (text) console.log(`\nModel says: ${text}`);
  }

  console.log(`\nSaved to ${opts.output}`);
}

generate(parseArgs(process.argv));
