import MarketingFooter from "../components/marketing-footer";
import MarketingHeader from "../components/marketing-header";
import PricingSection from "../components/pricing-section";

export default function PricingPage() {
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <MarketingHeader />
            <main className="flex-grow pt-20">
                <PricingSection />
            </main>
            <MarketingFooter />
        </div>
    );
}
