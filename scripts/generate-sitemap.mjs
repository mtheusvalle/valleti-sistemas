import { writeFile } from "node:fs/promises";

const inputUrl = process.env.SITE_URL?.trim();
let siteUrl;
try {
  const parsed = new URL(inputUrl);
  if (parsed.protocol === "https:" && parsed.pathname === "/" && !parsed.search && !parsed.hash) siteUrl = parsed.origin;
} catch {}
if (!siteUrl) {
  console.error("Set SITE_URL to the production HTTPS origin, for example https://valletisistemas.com.br");
  process.exit(1);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`;
await writeFile(new URL("../sitemap.xml", import.meta.url), xml, "utf8");
await writeFile(new URL("../robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");
console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`);
