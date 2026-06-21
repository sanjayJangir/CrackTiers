/**
 * App base path — must stay in sync with next.config.ts `basePath`.
 * Set NEXT_PUBLIC_BASE_PATH="" for root deployment (localhost).
 */
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? "/product/cracktiers";

export const BASE_PATH = raw === "/" ? "" : raw.replace(/\/$/, "");

/** Prefix an app path with the configured basePath (for fetch, etc.). */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return BASE_PATH ? `${BASE_PATH}${normalized}` : normalized;
}
