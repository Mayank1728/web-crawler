function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let url = `${urlObj.hostname}${urlObj.pathname}`;
  if (url[url.length - 1] === '/') url = url.slice(0, -1);
  return url;
}
module.exports = {
  normalizeURL,
};
