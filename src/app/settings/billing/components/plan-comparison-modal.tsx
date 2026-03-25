
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


interface PlanComparisonModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentPlan: string;
}

const pricingPlans = [
  {
    name: 'Starter',
    price: 99,
    features: ['1 Business', 'Up to 5 users', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: 299,
    features: ['Up to 5 Businesses', '25 users', 'AI predictions', 'Priority support', 'Multi-currency'],
  },
  {
    name: 'Enterprise',
    price: 999,
    features: ['Unlimited businesses', 'Unlimited users', 'White-label', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'],
  },
];

export default function PlanComparisonModal({ isOpen, onOpenChange, currentPlan }: PlanComparisonModalProps) {
    const { toast } = useToast();

    const handleSelectPlan = (planName: string) => {
        if (planName === "Enterprise") {
            toast({
                title: "Contacting Sales",
                description: "Our sales team will be in touch with you shortly.",
            });
        } else {
             toast({
                title: "Coming Soon!",
                description: "Self-serve plan management is under development."
            });
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>Choose the plan that fits your growing needs.</DialogDescription>
        </DialogHeader>
        <div className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <Card key={plan.name} className={cn('flex flex-col relative', plan.name === currentPlan && 'border-primary ring-2 ring-primary')}>
              {plan.name === currentPlan && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Current Plan</Badge>}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div>
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" disabled={plan.name === currentPlan} onClick={() => handleSelectPlan(plan.name)}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Select Plan'}
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
