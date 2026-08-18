#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const languages = ["en", "es", "pt"];

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
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

function mapEnglishValues(english, translated) {
  return Object.fromEntries(Object.entries(translated).map(([key, value]) => [english[key], value]));
}

function mapNestedStrings(english, translated, result = {}) {
  if (typeof english === "string" && typeof translated === "string") {
    result[english] = translated;
  } else if (Array.isArray(english) && Array.isArray(translated)) {
    english.forEach((value, index) => mapNestedStrings(value, translated[index], result));
  } else if (english && translated && typeof english === "object" && typeof translated === "object") {
    for (const key of Object.keys(english)) mapNestedStrings(english[key], translated[key], result);
  }
  return result;
}

function rewriteAssetPaths(html, prefix) {
  return html.replace(/(["'(])assets\//g, `$1${prefix}assets/`);
}

const locales = Object.fromEntries(
  languages.map(language => [language, readJson(path.join(root, "locales", `${language}.json`))])
);
for (const language of languages) {
  for (const key of ["staticTranslations", "serviceContent", "metaContent", "attributeTranslations", "profileContent", "profileUi"]) {
    if (locales[language].home[key] === undefined) throw new Error(`Missing home.${key} in locales/${language}.json`);
  }
  for (const key of ["translations", "ariaTranslations", "altTranslations", "metaTranslations"]) {
    if (locales[language].caseStudy[key] === undefined) throw new Error(`Missing caseStudy.${key} in locales/${language}.json`);
  }
}

fs.rmSync(output, {recursive: true, force: true});
fs.mkdirSync(output, {recursive: true});
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), {recursive: true});

for (const page of ["index.html", "how-we-work.html"]) {
  const template = fs.readFileSync(path.join(root, page), "utf8");
  const isHome = page === "index.html";

  for (const language of languages) {
    const locale = locales[language];
    const text = isHome
      ? {
          ...locale.home.staticTranslations,
           ...mapNestedStrings(locales.en.home.serviceContent, locale.home.serviceContent),
           ...mapNestedStrings(locales.en.home.profileContent, locale.home.profileContent)
        }
      : mapEnglishValues(locales.en.caseStudy.translations, locale.caseStudy.translations);
    const attributes = isHome
      ? {
          ...locale.home.attributeTranslations,
          "Open Carolina Vasconcelos full profile": locale.home.profileUi.carolina_aria,
          "Open Carmelo Alcaraz Coy full profile": locale.home.profileUi.carmelo_aria,
          "Close profile": locale.home.profileContent.carolina.close
        }
      : {
          ...mapEnglishValues(locales.en.caseStudy.ariaTranslations, locale.caseStudy.ariaTranslations),
          ...mapEnglishValues(locales.en.caseStudy.altTranslations, locale.caseStudy.altTranslations)
        };
    const metadata = isHome ? locale.home.metaContent : locale.caseStudy.metaTranslations;
    const localeData = isHome
      ? {home: {
          serviceContent: locale.home.serviceContent,
          attributeTranslations: locale.home.attributeTranslations,
          profileContent: locale.home.profileContent,
          profileUi: locale.home.profileUi
        }}
      : {caseStudy: {ariaTranslations: locale.caseStudy.ariaTranslations}};
    const localizedHtml = replaceMetadata(
      localiseAttributes(
        localiseText(render(template, {
          localeScript: `<script>window.STUDIO_LOCALE = ${JSON.stringify(localeData)};</script>`
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
      language === "en" ? "" : "../"
    );
    const destination = language === "en"
      ? path.join(output, page)
      : path.join(output, language, page);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.writeFileSync(destination, compiled);
  }
}

console.log("Built localized site in dist/");
