import type { ReactNode } from 'react';
import MarketingHeader from '../components/marketing-header';
import MarketingFooter from '../components/marketing-footer';

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
        <MarketingHeader />
        <main className="flex-grow">
            {children}
        </main>
        <MarketingFooter />
    </div>
  );
}
