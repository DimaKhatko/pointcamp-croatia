/**
 * Generates public/og-image.jpg (1200×630): a real camp photo cropped to fill, with a
 * brand-purple band at the bottom carrying the logo and the camp tagline.
 *
 * Dev-only and NOT wired into the build. Run it by hand when the photo or the copy changes:
 *   node scripts/generate-og-image.mjs
 *
 * It renders an HTML page in headless Chromium (so the repo's own Kyiv Type Sans font and
 * the logo SVG are used as-is) and saves a JPEG screenshot. Playwright is not a project
 * dependency; use any install, e.g. `npm i --no-save playwright` in the repo, or point
 * PLAYWRIGHT_DIR at a folder whose node_modules contains it. Set CHROMIUM_PATH to use an
 * existing Chromium binary instead of Playwright's own.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { chromium } = require(
  require.resolve("playwright", { paths: [root, process.env.PLAYWRIGHT_DIR].filter(Boolean) }),
);

const WIDTH = 1200;
const HEIGHT = 630;
const BAND = 190; // ~30% of the height
const PURPLE = "#452B70";
const QUALITY = 85;

// Photo: src/assets/photos/safety-team.webp (1200×800). Anchored to the bottom of the crop so
// the faces sit in the upper part of the frame, clear of the band.
const PHOTO = "src/assets/photos/safety-team.webp";
const PHOTO_POSITION = "50% 100%";
const LINE_1 = "Англомовний кемп у Хорватії";
const LINE_2 = "31.07–09.08.2027 · 8–17 років";

const dataUri = (file, mime) =>
  `data:${mime};base64,${readFileSync(path.join(root, file)).toString("base64")}`;
// The logo is purple on transparent; recolor it white for the purple band.
const logoSvg = readFileSync(path.join(root, "src/assets/logo-pointcamp.svg"), "utf8").replaceAll(
  "#452B70",
  "#FFFFFF",
);
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face {
  font-family: "Kyiv Type Sans";
  src: url("${dataUri("src/assets/fonts/KyivTypeSans-VarGX.woff2", "font/woff2")}") format("woff2");
  font-weight: 100 900;
}
* { margin: 0; box-sizing: border-box; }
body { width: ${WIDTH}px; height: ${HEIGHT}px; position: relative; overflow: hidden; background: ${PURPLE};
  font-family: "Kyiv Type Sans", system-ui, sans-serif; }
.photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: ${PHOTO_POSITION}; }
.band { position: absolute; left: 0; right: 0; bottom: 0; height: ${BAND}px; background: ${PURPLE};
  padding: 0 40px; display: flex; align-items: center; gap: 36px; color: #fff; }
.logo { height: 92px; width: auto; flex: none; }
.rule { width: 2px; height: 76px; background: rgba(255,255,255,0.35); flex: none; }
.l1 { font-size: 42px; font-weight: 800; line-height: 1.12; letter-spacing: -0.01em; }
.l2 { margin-top: 8px; font-size: 29px; font-weight: 500; line-height: 1.2; color: rgba(255,255,255,0.94); }
</style></head><body>
<img class="photo" src="${dataUri(PHOTO, "image/webp")}" alt="">
<div class="band">
  <img class="logo" src="${logoUri}" alt="">
  <div class="rule"></div>
  <div><div class="l1">${LINE_1}</div><div class="l2">${LINE_2}</div></div>
</div>
</body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const jpeg = await page.screenshot({ type: "jpeg", quality: QUALITY });
await browser.close();

const out = path.join(root, "public/og-image.jpg");
writeFileSync(out, jpeg);
console.log(`${out}: ${WIDTH}×${HEIGHT}, ${(statSync(out).size / 1024).toFixed(0)} KB`);
