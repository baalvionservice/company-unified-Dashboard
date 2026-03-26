
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import countriesData from '@/lib/data/countries.json';

interface BusinessSetupStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
}

const industries = ["Technology", "Retail", "Finance", "Media", "Agency", "Other"];

export default function BusinessSetupStep({ onNext, onBack }: BusinessSetupStepProps) {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="biz-name">Business Name</Label>
                <Input id="biz-name" placeholder="e.g., QuantumLeap AI" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="biz-country">Country</Label>
                <Select><SelectTrigger id="biz-country"><SelectValue placeholder="Select a country" /></SelectTrigger><SelectContent>{countriesData.map(c => <SelectItem key={c.id} value={c.name}>{c.flag} {c.name}</SelectItem>)}</SelectContent></Select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="biz-industry">Industry</Label>
                <Select><SelectTrigger id="biz-industry"><SelectValue placeholder="Select an industry" /></SelectTrigger><SelectContent>{industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="biz-currency">Currency</Label>
                <Select><SelectTrigger id="biz-currency"><SelectValue placeholder="Select currency" /></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="INR">INR</SelectItem><SelectItem value="GBP">GBP</SelectItem><SelectItem value="AED">AED</SelectItem><SelectItem value="SGD">SGD</SelectItem></SelectContent></Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label>Number of employees</Label>
            <RadioGroup defaultValue="1-10" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="1-10" id="r1" /><Label htmlFor="r1">1-10</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="11-50" id="r2" /><Label htmlFor="r2">11-50</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="51-200" id="r3" /><Label htmlFor="r3">51-200</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="200+" id="r4" /><Label htmlFor="r4">200+</Label></div>
            </RadioGroup>
        </div>
        <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <Button onClick={onNext}>Next</Button>
        </div>
    </div>
  );
}
