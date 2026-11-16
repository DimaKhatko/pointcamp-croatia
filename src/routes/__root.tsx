import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

// The toaster is only needed after a form submit, so its code (sonner) is a
// separate chunk that never blocks the first render.
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

const GTM_ID = "GTM-PGJNFD95";

/**
 * Deferred Google Tag Manager. `window.dataLayer` is declared in <head> right away
 * (so `lead_submit` / `video_play` pushes are never lost); gtm.js itself is
 * injected 3 s after `load` or on the first pointerdown / scroll / keydown /
 * touchstart, whichever comes first. GTM then processes everything already queued
 * in dataLayer, including the `gtm.js` event pushed here (the same event the
 * standard snippet pushes), so Page View / GA4 / Meta Pixel tags fire as before.
 */
const GTM_LOADER = `(function(w,d){var done=0,ev=['pointerdown','scroll','keydown','touchstart'];function load(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,load)});w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';d.head.appendChild(j)}ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});function later(){setTimeout(load,3000)}if(d.readyState==='complete')later();else w.addEventListener('load',later)})(window,document);`;

import appCss from "../styles.css?url";
import kyivTypeSansUrl from "../assets/fonts/KyivTypeSans-Sub.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Point Camp" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Point Camp" },
      { property: "og:locale", content: "uk_UA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#4A316D" },
      // Root defaults mirror the "/" route (src/routes/index.tsx); the "/" head
      // still overrides these with the same values plus canonical/og:url.
      { title: "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp" },
      { property: "og:title", content: "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp" },
      { name: "twitter:title", content: "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp" },
      { name: "description", content: "Англомовний кемп на Адріатиці 31.07–09.08.2027. Англійська щодня, безпека 24/7, 15 років досвіду. Діти щасливі, батьки спокійні. Лише 55 місць." },
      { property: "og:description", content: "Англомовний кемп на Адріатиці 31.07–09.08.2027. Англійська щодня, безпека 24/7, 15 років досвіду. Діти щасливі, батьки спокійні. Лише 55 місць." },
      { name: "twitter:description", content: "Англомовний кемп на Адріатиці 31.07–09.08.2027. Англійська щодня, безпека 24/7, 15 років досвіду. Діти щасливі, батьки спокійні. Лише 55 місць." },
      { property: "og:image", content: "https://croatia.pointcamp.com.ua/og-image-v2.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://croatia.pointcamp.com.ua/og-image-v2.jpg" },
    ],
    links: [
      // Without this the browser only discovers the display font after parsing the
      // CSS — it then swaps in late and re-wraps the H1, shifting everything below
      // (CLS). Preloading starts the download with the HTML. The URL comes from the same import the CSS @font-face resolves to
      // (one hashed file, fetched once). `crossOrigin` is required for font preloads.
      {
        rel: "preload",
        href: kyivTypeSansUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // BASE_URL is "/" today, so these are identical at "/"; using it keeps the
      // icons correct if a subfolder base (e.g. "/croatia/") is set later.
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.ico`, sizes: "any" },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon-16x16.png`, type: "image/png", sizes: "16x16" },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon-48x48.png`, type: "image/png", sizes: "48x48" },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon-192x192.png`, type: "image/png", sizes: "192x192" },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon-512x512.png`, type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
    ],
    scripts: [
      // Declared before anything else runs; gtm.js itself is deferred (GTM_LOADER).
      { children: "window.dataLayer=window.dataLayer||[];" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — MUST be in body, never head */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: GTM_LOADER }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Suspense fallback={null}>
        <Toaster richColors position="top-center" />
      </Suspense>
    </>
  );
}
