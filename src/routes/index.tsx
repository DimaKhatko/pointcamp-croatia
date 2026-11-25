import { lazy, Suspense, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { StickyHeader } from "@/components/landing/StickyHeader";
import { Hero } from "@/components/landing/Hero";
import { EmotionalIntro } from "@/components/landing/EmotionalIntro";
import { WhyPointCamp } from "@/components/landing/WhyPointCamp";
import { ThreePillars } from "@/components/landing/ThreePillars";
import { ActivitiesGrid } from "@/components/landing/ActivitiesGrid";
import { DayInCamp } from "@/components/landing/DayInCamp";
import { Safety } from "@/components/landing/Safety";
import { Footer } from "@/components/landing/Footer";
import { StickyApplyButton } from "@/components/landing/StickyApplyButton";
import { FAQS } from "@/components/landing/data";
import { getKyivDateString, getPublicOffer } from "@/lib/pricing";
import { BUILD_DATE } from "@/lib/buildDate.generated";

/**
 * Heavier sections below the first screen are separate chunks (video player, resort
 * carousel, reviews strip, pricing, FAQ accordion, form with zod/react-hook-form).
 * They are still prerendered into the HTML, so the content and layout are there
 * from the first paint; on the client each one hydrates once its chunk arrives,
 * which keeps that code off the critical path.
 */
const MomentsGallery = lazy(() =>
  import("@/components/landing/MomentsGallery").then((m) => ({ default: m.MomentsGallery })),
);
const ForWhom = lazy(() =>
  import("@/components/landing/ForWhom").then((m) => ({ default: m.ForWhom })),
);
const PineBeachResort = lazy(() =>
  import("@/components/landing/PineBeachResort").then((m) => ({ default: m.PineBeachResort })),
);
const Reviews = lazy(() =>
  import("@/components/landing/Reviews").then((m) => ({ default: m.Reviews })),
);
const DatesPricing = lazy(() =>
  import("@/components/landing/DatesPricing").then((m) => ({ default: m.DatesPricing })),
);
const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const ApplicationForm = lazy(() =>
  import("@/components/landing/ApplicationForm").then((m) => ({ default: m.ApplicationForm })),
);

/** One Suspense boundary per lazy section, so each hydrates independently. */
function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

const SITE_URL = "https://croatia.pointcamp.com.ua/";
const OG_IMAGE = "https://croatia.pointcamp.com.ua/og-image-v2.jpg";
const TITLE = "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp";
const DESCRIPTION =
  "Англомовний кемп на Адріатиці 31.07–09.08.2027. Англійська щодня, безпека 24/7, 15 років досвіду. Діти щасливі, батьки спокійні. Лише 55 місць.";

/** JSON-LD Offer price fields for today's date in Kyiv (never the presale price). */
function offerPrice(): { price: string; validFrom?: string } {
  const { price, validFrom } = getPublicOffer(getKyivDateString());
  return validFrom ? { price: String(price), validFrom } : { price: String(price) };
}

const ORG_ID = "https://pointcamp.com.ua/#organization";

/**
 * One JSON-LD @graph: the brand (same @id on every Point Camp landing, so crawlers
 * and AI search merge them into one entity), this page, the camp as an Event with
 * its public offer, and the FAQ. Everything here must match the visible page.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Point Camp",
        alternateName: "PointCamp",
        url: "https://pointcamp.com.ua/",
        logo: `${SITE_URL}favicon-512x512.png`,
        foundingDate: "2011",
        sameAs: [
          "https://www.facebook.com/pointcamp",
          "https://www.instagram.com/point_camp",
          "https://t.me/pointcamp",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+380662217373",
          contactType: "customer service",
          email: "contact@pointcamp.com.ua",
          availableLanguage: ["uk"],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}#webpage`,
        url: SITE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "uk",
        dateModified: BUILD_DATE,
        primaryImageOfPage: OG_IMAGE,
        publisher: { "@id": ORG_ID },
        about: { "@id": `${SITE_URL}#event` },
      },
      {
        "@type": "Event",
        "@id": `${SITE_URL}#event`,
        name: "Point Camp Хорватія — літній кемп 2027",
        description:
          "Англомовний літній кемп на Адріатиці для дітей 8–17 років. 10 днів: море, жива англійська щодня, безпека 24/7. 31.07–09.08.2027, Pine Beach Resort, Pakoštane.",
        image: OG_IMAGE,
        url: SITE_URL,
        inLanguage: "uk",
        startDate: "2027-07-31",
        endDate: "2027-08-09",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        typicalAgeRange: "8-17",
        maximumAttendeeCapacity: 55,
        audience: { "@type": "PeopleAudience", suggestedMinAge: 8, suggestedMaxAge: 17 },
        location: {
          "@type": "Place",
          name: "Pine Beach Resort, Pakoštane",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pakoštane",
            addressCountry: "HR",
          },
        },
        offers: {
          "@type": "Offer",
          // Public price at build time (see src/lib/pricing.ts): the presale price is
          // never published, so until the presale ends this is the first public tier
          // with validFrom. Rebuild and redeploy on every switch date.
          ...offerPrice(),
          priceCurrency: "EUR",
          availability: "https://schema.org/LimitedAvailability",
          url: `${SITE_URL}#apply`,
        },
        organizer: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Bing Webmaster Tools site verification: keep permanently (removing it unverifies the site).
      { name: "msvalidate.01", content: "BF4250F50D78E77F8D1A4C8F71BA2B54" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "uk_UA" },
      { property: "og:site_name", content: "Point Camp" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Група підлітків у помаранчевих рятувальних жилетах із веслами на березі Адріатики — літній кемп Point Camp у Хорватії",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData()),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <Hero />
        <EmotionalIntro />
        <Lazy>
          <MomentsGallery />
        </Lazy>
        <WhyPointCamp />
        <Lazy>
          <ForWhom />
        </Lazy>
        <ThreePillars />
        <ActivitiesGrid />
        <DayInCamp />
        <Lazy>
          <PineBeachResort />
        </Lazy>
        <Safety />
        <Lazy>
          <Reviews />
        </Lazy>
        <Lazy>
          <DatesPricing />
        </Lazy>
        <Lazy>
          <FAQ />
        </Lazy>
        <Lazy>
          <ApplicationForm />
        </Lazy>
      </main>
      <Footer />
      <StickyApplyButton />
    </>
  );
}
