import { InferenceClient } from "@huggingface/inference";

const HF_PROVIDER = "nscale" as const;
const HF_MODEL = "black-forest-labs/FLUX.1-schnell";
const HF_NUM_INFERENCE_STEPS = 5;

/** Prefer explicit token (e.g. from Settings / localStorage); otherwise `.env` → `import.meta.env.VITE_HF_TOKEN`. */
export function resolveHfToken(explicit?: string): string {
  const fromUi = explicit?.trim();
  if (fromUi) return fromUi;
  return import.meta.env.VITE_HF_TOKEN?.trim() ?? "";
}

export async function generateImage(
  prompt: string,
  accessToken?: string
): Promise<string> {
  const token = resolveHfToken(accessToken);
  if (!token) {
    throw new Error("API Key is missing. Add VITE_HF_TOKEN to .env and restart the dev server.");
  }

  const client = new InferenceClient(token);

  const blob = await client.textToImage(
    {
      provider: HF_PROVIDER,
      model: HF_MODEL,
      inputs: prompt,
      parameters: { num_inference_steps: HF_NUM_INFERENCE_STEPS },
    },
    { outputType: "blob" }
  );

  return URL.createObjectURL(blob);
}
