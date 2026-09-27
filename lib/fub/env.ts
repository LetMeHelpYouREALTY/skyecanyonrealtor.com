/** Follow Up Boss credentials (Vercel uses FOLLOW_UP_BOSS_API_KEY). */
export const FUB_SYSTEM_NAME = "DrJanDuffyWebsite";

export function getFubApiKey(): string | undefined {
  const key =
    process.env.FOLLOW_UP_BOSS_API_KEY?.trim() ||
    process.env.FUB_API_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

export function getFubSystemKey(): string | undefined {
  const key = process.env.FUB_SYSTEM_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

export function createFubClientConfig(): {
  apiKey: string;
  systemKey?: string;
} {
  const apiKey = getFubApiKey();
  if (!apiKey) {
    throw new Error("FUB API key not configured");
  }
  const systemKey = getFubSystemKey();
  return systemKey ? { apiKey, systemKey } : { apiKey };
}
