#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const languages = ["es", "pt"];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function render(template, values) {
  return template.replace(/{{\s*([\w.-]+)\s*}}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Missing template value: ${key}`);
    return values[key];
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function localiseText(html, translations) {
  return html.replace(/(>)([^<]+)(<)/g, (match, opening, text, closing) => {
    const leading = text.match(/^\s*/)[0];
    const trailing = text.match(/\s*$/)[0];
    const source = decodeHtml(text.trim().replace(/\s+/g, " "));
    const translated = translations[source];
    return translated === undefined
      ? match
      : `${opening}${leading}${escapeHtml(translated)}${trailing}${closing}`;
  });
}

function localiseAttributes(html, translations) {
  return html.replace(/\b(aria-label|alt)=(['"])(.*?)\2/gi, (match, attribute, quote, value) => {
    const translated = translations[decodeHtml(value)];
    return translated === undefined
      ? match
      : `${attribute}=${quote}${escapeHtml(translated)}${quote}`;
  });
}

function replaceMetadata(html, metadata) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/(<meta\s+content=")[^"]*("\s+name="description"\s*\/?>)/i, `$1${escapeHtml(metadata.description)}$2`)
    .replace(/(<meta\s+content=")[^"]*("\s+property="og:title"\s*\/?>)/i, `$1${escapeHtml(metadata.title)}$2`)
    .replace(/(<meta\s+content=")[^"]*("\s+property="og:description"\s*\/?>)/i, `$1${escapeHtml(metadata.og)}$2`);
}

function replaceMailSubjects(html, subject) {
  return html.replace(/subject=[^"'\s>]+/g, `subject=${encodeURIComponent(subject)}`);
}

function extractKeyedText(html) {
  const values = {};
  const pattern = /<([\w:-]+)\b([^>]*)\bdata-i18n=(['"])([^'"]+)\3[^>]*>([\s\S]*?)<\/\1\s*>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const value = decodeHtml(match[5].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    if (value) values[match[4]] = value;
  }
  return values;
}

function extractKeyedAttributes(html, key, attribute) {
  const values = {};
  const keyAttribute = `data-i18n-${key}`;
  const pattern = new RegExp(`<[\\w:-]+\\b(?=[^>]*\\b${keyAttribute}=(['"])([^'"]+)\\1)(?=[^>]*\\b${attribute}=(['"])(.*?)\\3)[^>]*>`, "gi");
  let match;

  while ((match = pattern.exec(html))) values[match[2]] = decodeHtml(match[4]);
  return values;
}

function mapTemplateValues(source, translations) {
  return Object.fromEntries(Object.entries(translations).map(([key, value]) => {
    if (!(key in source)) throw new Error(`Missing template source for translation key: ${key}`);
    return [source[key], value];
  }));
}

function rewriteAssetPaths(html, prefix) {
  return html.replace(/(["'(])assets\//g, `$1${prefix}assets/`);
}

const locales = Object.fromEntries(
  languages.map(language => [language, readJson(path.join(root, "locales", `${language}.json`))])
);
for (const language of languages) {
  for (const key of ["staticTranslations", "metaContent", "attributeTranslations", "menuLabels"]) {
    if (locales[language].home[key] === undefined) throw new Error(`Missing home.${key} in locales/${language}.json`);
  }
  for (const key of ["translations", "ariaTranslations", "altTranslations", "metaTranslations", "menuLabels"]) {
    if (locales[language].caseStudy[key] === undefined) throw new Error(`Missing caseStudy.${key} in locales/${language}.json`);
  }
}

fs.rmSync(output, {recursive: true, force: true});
fs.mkdirSync(output, {recursive: true});
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), {recursive: true});

for (const page of ["index.html", "how-we-work.html"]) {
  const template = fs.readFileSync(path.join(root, page), "utf8");
  const isHome = page === "index.html";
  const defaultHtml = rewriteAssetPaths(
    render(template, {
      menuOpenLabel: "Open navigation",
      menuCloseLabel: "Close navigation"
    }),
    ""
  );
  fs.writeFileSync(path.join(output, page), defaultHtml);
  const caseStudyText = isHome ? null : extractKeyedText(template);
  const caseStudyAria = isHome ? null : extractKeyedAttributes(template, "aria", "aria-label");
  const caseStudyAlt = isHome ? null : extractKeyedAttributes(template, "alt", "alt");

  for (const language of languages) {
    const locale = locales[language];
    const text = isHome
      ? locale.home.staticTranslations
      : mapTemplateValues(caseStudyText, locale.caseStudy.translations);
    const attributes = isHome
      ? locale.home.attributeTranslations
      : {
          ...mapTemplateValues(caseStudyAria, locale.caseStudy.ariaTranslations),
          ...mapTemplateValues(caseStudyAlt, locale.caseStudy.altTranslations)
        };
    const metadata = isHome ? locale.home.metaContent : locale.caseStudy.metaTranslations;
    const menuLabels = isHome
      ? {
          open: locale.home.menuLabels.open,
          close: locale.home.menuLabels.close
        }
      : {
          open: locale.caseStudy.menuLabels.open,
          close: locale.caseStudy.menuLabels.close
        };
    const localizedHtml = replaceMetadata(
      localiseAttributes(
        localiseText(render(template, {
          menuOpenLabel: escapeHtml(menuLabels.open),
          menuCloseLabel: escapeHtml(menuLabels.close)
        }), text),
        attributes
      ),
      metadata
    );
    const withMailSubjects = isHome
      ? replaceMailSubjects(localizedHtml, metadata.subject)
      : localizedHtml;
    const compiled = rewriteAssetPaths(
      withMailSubjects.replace(/<html\b([^>]*)\blang="[^"]*"/, `<html$1lang="${language}"`),
      "../"
    );
    const destination = path.join(output, language, page);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.writeFileSync(destination, compiled);
  }
}

console.log("Built localized site in dist/");
