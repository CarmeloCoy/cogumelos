#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const localeDirectory = path.join(root, "locales");
const languages = ["en", "es", "pt"];

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function normalise(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function removeIgnoredElements(html) {
  const ignoredAttribute = "\\bdata-i18n-ignore(?:\\s|=|>|/)";
  const ignoredElement = new RegExp(
    `<([\\w:-]+)\\b(?=[^>]*${ignoredAttribute})[^>]*>[\\s\\S]*?<\\/\\1\\s*>`,
    "gi"
  );
  const ignoredVoidElement = new RegExp(
    `<[\\w:-]+\\b(?=[^>]*${ignoredAttribute})[^>]*\\/\\s*>`,
    "gi"
  );

  return html.replace(ignoredElement, "").replace(ignoredVoidElement, "");
}

function extractText(html) {
  const content = removeIgnoredElements(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const strings = new Set();
  const textNodes = /(?:^|>)([^<]+)(?=<|$)/g;
  let match;

  while ((match = textNodes.exec(content))) {
    const value = normalise(match[1]);
    if (value && !value.includes("{{")) strings.add(value);
  }
  return strings;
}

function extractAttributes(html, attribute) {
  const values = new Set();
  const pattern = new RegExp(`\\b${attribute}=(['"])(.*?)\\1`, "gi");
  let match;

  while ((match = pattern.exec(removeIgnoredElements(html)))) values.add(normalise(match[2]));
  return values;
}

function extractKeys(html, attribute) {
  const keys = new Set();
  const attributeName = attribute ? `data-i18n-${attribute}` : "data-i18n";
  const pattern = new RegExp(`\\b${attributeName}=(['"])([^'"]+)\\1`, "gi");
  let match;

  while ((match = pattern.exec(removeIgnoredElements(html)))) keys.add(match[2]);
  return keys;
}

function removeStaleEntries(translations, activeKeys) {
  let removed = 0;

  for (const key of Object.keys(translations)) {
    if (!activeKeys.has(key)) {
      delete translations[key];
      removed += 1;
    }
  }
  return removed;
}

const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const caseStudyHtml = fs.readFileSync(path.join(root, "how-we-work.html"), "utf8");
const homeText = extractText(homeHtml);
const homeAttributes = new Set([
  ...extractAttributes(homeHtml, "alt"),
  ...extractAttributes(homeHtml, "aria-label"),
  ...extractAttributes(homeHtml, "title")
]);
const caseStudyTranslations = extractKeys(caseStudyHtml);
const caseStudyAria = extractKeys(caseStudyHtml, "aria");

let removed = 0;
for (const language of languages) {
  const localeFile = path.join(localeDirectory, `${language}.json`);
  const locale = readJson(localeFile);

  removed += removeStaleEntries(locale.home.staticTranslations, homeText);
  removed += removeStaleEntries(locale.home.attributeTranslations, homeAttributes);
  removed += removeStaleEntries(locale.caseStudy.translations, caseStudyTranslations);
  removed += removeStaleEntries(locale.caseStudy.ariaTranslations, caseStudyAria);
  writeJson(localeFile, locale);
}

console.log(`Removed ${removed} stale translation${removed === 1 ? "" : "s"}`);
