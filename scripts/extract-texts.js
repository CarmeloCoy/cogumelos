#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const templateDirectory = root;
const output = path.join(root, "locales", "source-texts.json");
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

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function extractText(html) {
  const content = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const strings = [];
  const textNodes = /(?:^|>)([^<]+)(?=<|$)/g;
  let match;

  while ((match = textNodes.exec(content))) strings.push(normalise(match[1]));
  return unique(strings.filter(value => !value.includes("{{")));
}

function extractAttributes(html, attribute) {
  const values = [];
  const pattern = new RegExp(`\\b${attribute}=(['"])(.*?)\\1`, "gi");
  let match;

  while ((match = pattern.exec(html))) values.push(normalise(match[2]));
  return unique(values);
}

function extractKeyedText(html) {
  const values = {};
  const pattern = /<([\w:-]+)\b([^>]*)\bdata-i18n=(['"])([^'"]+)\3[^>]*>([\s\S]*?)<\/\1\s*>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const value = normalise(match[5].replace(/<[^>]+>/g, ""));
    if (value && !value.includes("{{")) values[match[4]] = value;
  }
  return values;
}

function extractKeyedAttributes(html, attribute) {
  const values = {};
  const attributeName = attribute === "aria" ? "aria-label" : attribute;
  const pattern = new RegExp(`<[\\w:-]+\\b(?=[^>]*\\bdata-i18n-${attribute}=(['"])([^'"]+)\\1)(?=[^>]*\\b${attributeName}=(['"])(.*?)\\3)[^>]*>`, "gi");
  let match;

  while ((match = pattern.exec(html))) values[match[2]] = normalise(match[4]);
  return values;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function syncTranslations(translations, source, language) {
  for (const [key, value] of Object.entries(source)) {
    if (language === "en" || !(key in translations)) translations[key] = value;
  }
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const files = fs.readdirSync(templateDirectory)
  .filter(file => file.endsWith(".html"))
  .sort();
const inventory = Object.fromEntries(files.map(file => {
  const html = fs.readFileSync(path.join(templateDirectory, file), "utf8");
  return [file, {
    text: extractText(html),
    attributes: {
      alt: extractAttributes(html, "alt"),
      "aria-label": extractAttributes(html, "aria-label"),
      title: extractAttributes(html, "title")
    }
  }];
}));

fs.writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);

const home = inventory["index.html"];
const caseStudy = inventory["how-we-work.html"];
const homeText = Object.fromEntries(home.text.map(value => [value, value]));
const homeAttributes = Object.fromEntries(
  ["alt", "aria-label", "title"].flatMap(attribute =>
    home.attributes[attribute].map(value => [value, value])
  )
);
const caseStudyText = extractKeyedText(fs.readFileSync(path.join(root, "how-we-work.html"), "utf8"));
const caseStudyAria = extractKeyedAttributes(
  fs.readFileSync(path.join(root, "how-we-work.html"), "utf8"),
  "aria"
);

for (const language of languages) {
  const localeFile = path.join(root, "locales", `${language}.json`);
  const locale = readJson(localeFile);

  syncTranslations(locale.home.staticTranslations, homeText, language);
  syncTranslations(locale.home.attributeTranslations, homeAttributes, language);
  syncTranslations(locale.caseStudy.translations, caseStudyText, language);
  syncTranslations(locale.caseStudy.ariaTranslations, caseStudyAria, language);
  writeJson(localeFile, locale);
}

console.log(`Extracted source text to ${path.relative(root, output)} and synchronized locale files`);
