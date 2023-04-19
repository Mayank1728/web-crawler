const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
  let urls = [];
  let { window } = new JSDOM(htmlBody);
  let { document } = window;
  for (let i = 0; i < document.links.length; i++) {
    try {
      let linksTo = document.links[i].href;
      let doesWork = new URL(linksTo); // is Link valid
      if (linksTo[0] === '/') {
        // relative path
        urls.push(`${baseURL}${linksTo}`);
      } else {
        // absolute path
        urls.push(linksTo);
      }
    } catch (err) {
      // link is invalid
      console.log(err.message);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let url = `${urlObj.hostname}${urlObj.pathname}`;
  if (url[url.length - 1] === '/') url = url.slice(0, -1);
  return url;
}
module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
