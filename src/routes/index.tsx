import { createFileRoute } from "@tanstack/react-router";

import { StickyHeader } from "@/components/landing/StickyHeader";
import { Hero } from "@/components/landing/Hero";
import { EmotionalIntro } from "@/components/landing/EmotionalIntro";
import { WhyPointCamp } from "@/components/landing/WhyPointCamp";
import { ForWhom } from "@/components/landing/ForWhom";
import { ThreePillars } from "@/components/landing/ThreePillars";
import { ActivitiesGrid } from "@/components/landing/ActivitiesGrid";
import { DayInCamp } from "@/components/landing/DayInCamp";
import { PineBeachResort } from "@/components/landing/PineBeachResort";
import { Safety } from "@/components/landing/Safety";
import { DatesPricing } from "@/components/landing/DatesPricing";
import { FAQ } from "@/components/landing/FAQ";
import { ApplicationForm } from "@/components/landing/ApplicationForm";
import { Footer } from "@/components/landing/Footer";

const SITE_URL = "https://croatia.pointcamp.com.ua/";
const OG_IMAGE = "https://croatia.pointcamp.com.ua/og-image.jpg";
const TITLE = "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp";
const DESCRIPTION =
  "Літній кемп Point Camp у Хорватії 31.07–09.08.2026: Адріатика, англійська щодня, безпека 24/7, 16 років досвіду. Лише 55 місць. Залиште заявку.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "uk_UA" },
      { property: "og:site_name", content: "Point Camp" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1280" },
      {
        property: "og:image:alt",
        content: "Адріатичне узбережжя Хорватії — місце літнього кемпу Point Camp",
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
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Point Camp",
          url: SITE_URL,
          logo: `${SITE_URL}favicon.svg`,
          sameAs: [
            "https://facebook.com/pointcamp",
            "https://instagram.com/pointcamp",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+380662217373",
            contactType: "customer service",
            email: "contact@pointcamp.com.ua",
            availableLanguage: ["uk", "en"],
          },
          event: {
            "@type": "Event",
            name: "Point Camp Хорватія — Flagship заїзд 2026",
            startDate: "2026-07-31",
            endDate: "2026-08-09",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
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
              price: "1550",
              priceCurrency: "EUR",
              availability: "https://schema.org/LimitedAvailability",
              url: `${SITE_URL}#apply`,
            },
            organizer: { "@type": "Organization", name: "Point Camp", url: SITE_URL },
          },
        }),
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
        <WhyPointCamp />
        <ForWhom />
        <ThreePillars />
        <ActivitiesGrid />
        <DayInCamp />
        <PineBeachResort />
        <Safety />
        <DatesPricing />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
