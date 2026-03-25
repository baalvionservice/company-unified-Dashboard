
'use client';

import CurrentPlan from './components/current-plan';
import UsageMetrics from './components/usage-metrics';
import PaymentMethods from './components/payment-methods';
import BillingContact from './components/billing-contact';
import billingData from '@/lib/data/billing.json';

export default function BillingPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your plan, payment methods, and billing information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <CurrentPlan subscription={billingData.subscription} />
          <PaymentMethods paymentMethod={billingData.subscription.paymentMethod} />
          <BillingContact contact={billingData.billingContact} />
        </div>
        <div className="lg:col-span-1">
          <UsageMetrics usage={billingData.usage} />
        </div>
      </div>
    </div>
  );
}
