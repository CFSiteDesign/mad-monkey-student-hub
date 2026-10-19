// Resolves a file in /public against the build's base path. The site is served
// from a sub-path on minis.madmonkeyhostels.com (the deploy injects --base), so
// never hardcode "/file.ext" for public files: route them through asset().
export function asset(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
