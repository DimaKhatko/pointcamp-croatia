import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    // Static prerender instead of the SPA shell: "/" is written with its full
    // content, so the hero text is in the HTML before any JS runs (that is what
    // LCP waits for). Unknown paths get the static public/404.html from Firebase
    // (no catch-all rewrite: the "/" HTML must only hydrate on "/").
    spa: { enabled: false },
    prerender: { enabled: true, crawlLinks: false },
    pages: [{ path: "/" }],
  },
});
