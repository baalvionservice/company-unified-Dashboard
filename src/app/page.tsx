import type { Metadata } from "next";
import HeroSection from "./marketing/components/hero-section";
import LogosSection from "./marketing/components/logos-section";
import FeaturesSection from "./marketing/components/features-section";
import StatsBar from "./marketing/components/stats-bar";
import HowItWorks from "./marketing/components/how-it-works";
import MarketingFooter from "./marketing/components/marketing-footer";
import MarketingHeader from "./marketing/components/marketing-header";
import PricingSection from "./marketing/components/pricing-section";
import FaqSection from "./marketing/components/faq-section";
import TestimonialsSection from "./marketing/components/testimonials-section";
import ComparisonTable from "./marketing/components/comparison-table";
import BlogSection from "./marketing/components/blog-section";

export const metadata: Metadata = {
  title: "Baalvion | The Global Business Operating System",
  description:
    "Manage all your businesses, employees, finances, and equity — across every country — from one intelligent dashboard.",
  openGraph: {
    title: "Baalvion | The Global Business Operating System",
    description:
      "Manage all your businesses, employees, finances, and equity — across every country — from one intelligent dashboard.",
    images: ["https://picsum.photos/seed/dashboard-screenshot/1200/630"],
  },
  keywords: [
    "business management",
    "global dashboard",
    "multi-business",
    "international operations",
  ],
  robots: "index, follow",
};

// Server component - renders marketing page for SEO
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <LogosSection />
        <StatsBar />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="comparison">
          <ComparisonTable />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="faq">
          <FaqSection />
        </section>
        <section id="blog">
          <BlogSection />
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
