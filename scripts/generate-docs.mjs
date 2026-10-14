import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, relative, dirname } from "node:path";
const checkOnly = process.argv.includes("--check");
const output = (file, content) => {
  if (checkOnly) {
    if (readFileSync(file, "utf8") !== content)
      throw new Error("Generated docs are stale: " + file);
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
};
const pages = JSON.parse(readFileSync("docs/content/pages.json", "utf8"));
const sourceLedger = JSON.parse(readFileSync("site/data/claims.json", "utf8"));
const workflowPreview = JSON.parse(readFileSync("site/data/workflow-preview.json", "utf8"));
const site = resolve("site");
const groups = [
  "Start here",
  "Work with Rovara Code",
  "Configure",
  "Reference",
  "Help",
];
const pathFor = (p) =>
  p.slug ? `docs/${p.slug}/index.html` : "docs/index.html";
const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const text = (s) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const search = [];
for (let i = 0; i < pages.length; i++) {
  const p = pages[i],
    file = resolve(site, pathFor(p));
  const link = (target) =>
    relative(dirname(file), resolve(site, target)).replaceAll("\\", "/") ||
    "index.html";
  const toc = p.sections
    .map((s) => `<a href="#${s.id}">${escape(s.title)}</a>`)
    .join("");
  const nav = groups
    .map(
      (g) =>
        `<div class="docs-nav-group"><p>${g}</p>${pages
          .filter((x) => x.group === g)
          .map(
            (x) =>
              `<a href="${link(pathFor(x))}" ${x.slug === p.slug ? 'aria-current="page"' : ""}>${escape(x.title)}</a>`,
          )
          .join(
            "",
          )}</div>`,
    )
    .join("");
  const sections = p.sections
    .map(
      (s) =>
        `<section id="${s.id}"><h2>${escape(s.title)}<a class="doc-heading-link" href="#${s.id}" aria-label="Link to section ${escape(s.title)}">#</a></h2>${s.html}</section>`,
    )
    .join("\n");
  const prev = pages[i - 1],
    next = pages[i + 1];
  const pager = `<nav class="docs-pager" aria-label="Next and previous pages">${prev ? `<a href="${link(pathFor(prev))}"><span>Previous</span>${escape(prev.title)}</a>` : "<div></div>"}${next ? `<a href="${link(pathFor(next))}"><span>Next</span>${escape(next.title)} →</a>` : ""}</nav>`;
  const legacy =
    p.slug === ""
      ? '<div class="legacy-doc-links">' +
        [
          "operate",
          "workflow",
          "checks",
          "architecture",
          "connections",
          "models",
          "security",
          "license",
          "install",
          "release",
          "mcp",
        ]
          .map((id) => `<span id="${id}"></span>`)
          .join("") +
        "</div>"
      : "";
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f8f5ef"><title>${escape(p.title)} — Rovara Code</title><meta name="description" content="${escape(p.lead)}"><link rel="canonical" href="https://rovara-dev.github.io/${p.slug ? `docs/${p.slug}/` : "docs/"}"><link rel="icon" href="${link("assets/icons/git-pull-request.svg")}"><link rel="preload" href="${link("assets/fonts/inter-600.woff2")}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${link("assets/site.css")}"><link rel="stylesheet" href="${link("assets/refined.css")}"><link rel="stylesheet" href="${link("assets/docs.css")}"><link rel="stylesheet" href="${link("assets/scroll-story.css")}"><script src="${link("assets/docs.js")}" defer></script></head><body class="docs-page"><noscript><style>.docs-search-trigger{display:none}</style></noscript><a class="skip-link" href="#main">Skip to content</a><header class="docs-header"><div class="docs-brand"><a href="${link("index.html")}" aria-label="Rovara Code home">Rovara Code</a><span>Docs</span></div><button class="docs-search-trigger" data-doc-search aria-label="Search documentation" aria-haspopup="dialog"><img src="${link("assets/icons/magnifying-glass.svg")}" width="18" height="18" alt=""><span>Search documentation</span><kbd>⌘ K</kbd></button><nav aria-label="Main navigation"><a href="${link("index.html")}">Product</a><a href="${link("docs/release/index.html")}" class="docs-status" title="Published release and mainline status">Release status</a></nav></header><div class="docs-layout"><aside class="docs-sidebar"><details class="docs-nav-disclosure" open><summary>Browse documentation</summary><nav aria-label="Documentation">${nav}</nav></details></aside><main id="main" class="docs-content"><div class="docs-breadcrumb"><a href="${link("docs/index.html")}">Documentation</a><span>/</span>${escape(p.group)}</div><header class="docs-title"><p class="docs-kind">${escape(p.kind)}</p><h1>${escape(p.title)}</h1><p>${escape(p.lead)}</p></header><details class="docs-mobile-toc"><summary>On this page</summary><nav aria-label="Page sections">${toc}</nav></details><article class="docs-article">${sections}</article>${legacy}<div class="docs-maintenance"><span>Docs updated 14 October 2026</span><a href="${link("docs/release/index.html")}#documentation">How these docs are maintained</a><a href="https://github.com/rovara-dev/rovara-dev.github.io/issues/new">Report a docs issue</a></div>${pager}<footer class="docs-footer"><span>Rovara Code · Coding agents in your AWS account.</span><a href="https://github.com/PrepLabsAI/Rovara">Product source</a><a href="${link("docs/release/index.html")}#license">Licence</a></footer></main><aside class="docs-toc"><nav aria-label="On this page"><p>On this page</p>${toc}</nav></aside></div><dialog class="docs-search-dialog" aria-labelledby="docs-search-title" data-index="${link("data/docs-search.json")}"><div class="docs-search-heading"><h2 id="docs-search-title">Search documentation</h2><button data-search-close aria-label="Close search">Esc</button></div><label class="sr-only" for="docs-search-input">Search terms</label><input id="docs-search-input" type="search" placeholder="Try plan approval, PR feedback or checks…" autocomplete="off"><p class="docs-search-status" aria-live="polite"></p><ul class="docs-search-results"></ul><p class="docs-search-help">↑ ↓ Navigate · Enter Open · Esc Close</p></dialog></body></html>`;
  output(file, html.replace(/></g, ">\n<").replace(/[ \t]+$/gm, "") + "\n");
  search.push({
    title: p.title,
    group: p.group,
    url: pathFor(p),
    description: p.lead,
    body: text(sections),
  });
  for (const s of p.sections)
    search.push({
      title: s.title,
      page: p.title,
      group: p.group,
      url: `${pathFor(p)}#${s.id}`,
      description: text(s.html).slice(0, 180),
      body: text(s.html),
    });
}
output(
  resolve(site, "data/docs-search.json"),
  JSON.stringify(search, null, 2) + "\n",
);
const guide = pages
  .filter((p) => !["benchmarks", "release"].includes(p.slug))
  .map(
    (p) =>
      `# ${p.title}\n\n${p.lead}\n\n` +
      p.sections.map((s) => `## ${s.title}\n\n${text(s.html)}`).join("\n\n"),
  )
  .join("\n\n");
const sitemapPaths = ["index.html", "how-it-works/index.html", "deployment/index.html", ...pages.map(pathFor)];
output(resolve(site, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map(path => `  <url><loc>https://rovara-dev.github.io/${path === "index.html" ? "" : path}</loc></url>`).join("\n")}\n</urlset>\n`);
output(
  resolve(site, "agent-guide.md"),
  `# Rovara Code agent guide\n\nPublic source: https://github.com/PrepLabsAI/Rovara. Install with Launch in AWS or npx @preplabsai/rovara-code init --env <name>; see docs/install. Node 22.19 or newer is required for the CLI (Node 22 LTS recommended). The package supplies rovara and agentx aliases. Published v0.3.4 includes the native workflow. These docs follow product mainline ${sourceLedger.source.commit}, which includes later changes; deployment configuration and feature flags still apply. Source presence is separate from runtime acceptance. Workflow source record: ${workflowPreview.nativeWorkflowSource}. Mainline contains opt-in serial task dependencies; the flag is off by default and runtime activation/qualification remains separate. See docs/release for qualification.\n\n${guide}\n`,
);
console.log(
  `Generated ${pages.length} documentation pages and ${search.length} searchable pages/sections.`,
);
