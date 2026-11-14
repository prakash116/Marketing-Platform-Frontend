/** Prefix public assets when the site is served from a GitHub Pages project path. */
export function withBasePath(src: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
