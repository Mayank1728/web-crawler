const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { JSDOM } = require('jsdom');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});
test('normalizeURL strip trailing slash', () => {
  const input = 'http://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'http://bLog.bOOt.Dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
  const html = `
<!DOCTYPE html>
 <html>
  <head></head>
   <body>
    <p>Hello world</p>
     <a href="https://blog.boot.dev/path">
      BootDev Blog
     </a>
   </body>
  <footer></footer>
 </html>
  `;
  const baseURL = `https://blog.boot.dev`;
  const actual = getURLsFromHTML(html, baseURL);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const html = `
<!DOCTYPE html>
 <html>
  <head></head>
   <body>
    <p>Hello world</p>
     <a href="/path">
      BootDev Blog
     </a>
   </body>
  <footer></footer>
 </html>
  `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(html, baseURL);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
  const html = `
<!DOCTYPE html>
 <html>
  <head></head>
   <body>
    <p>Hello world</p>
     <a href="https://blog.boot.dev/path1">
      BootDev Blog
     </a>
     <h1>Welcome</h1>
     <a href="/path2">
      Path2
     </a>
   </body>
  <footer></footer>
 </html>
  `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(html, baseURL);
  const expected = [
    'https://blog.boot.dev/path1',
    'https://blog.boot.dev/path2',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
  const html = `
<!DOCTYPE html>
 <html>
  <head></head>
   <body>
    <p>Hello world</p>
     <a href="invalid">
      BootDev Blog
     </a>
   </body>
  <footer></footer>
 </html>
  `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(html, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
