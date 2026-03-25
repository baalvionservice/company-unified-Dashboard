import HeroSection from './components/hero-section';
import LogosSection from './components/logos-section';
import FeaturesSection from './components/features-section';
import StatsBar from './components/stats-bar';
import HowItWorks from './components/how-it-works';
import MarketingFooter from './components/marketing-footer';
import MarketingHeader from './components/marketing-header';
import PricingSection from './components/pricing-section';
import FaqSection from './components/faq-section';

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <StatsBar />
        <HowItWorks />
        <PricingSection />
        <FaqSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
