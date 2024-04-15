export function formatParamUrl(urlString) {
  return decodeURIComponent(urlString.replace(/\+/g, " "));
}
