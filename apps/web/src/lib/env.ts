function normalizeApiUrl(raw?: string): string {
  if (!raw) return "http://localhost:8000";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

export const env = {
  apiUrl: normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL),
  useMocks: process.env.NEXT_PUBLIC_USE_MOCKS === "true",
  basemapStyleUrl:
    process.env.NEXT_PUBLIC_BASEMAP_STYLE_URL ||
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

