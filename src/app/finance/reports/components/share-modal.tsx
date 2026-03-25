'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ShareModal({ isOpen, onOpenChange }: ShareModalProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();
  const shareableLink = "https://baalvion.app/reports/share/shr_a1b2c3d4e5f6";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setHasCopied(true);
    toast({ title: 'Link copied to clipboard!' });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Report</DialogTitle>
          <DialogDescription>
            Share a secure, view-only link to this report with your stakeholders.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="share-link">Shareable Link</Label>
                <div className="flex items-center gap-2">
                    <Input id="share-link" value={shareableLink} readOnly />
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="expiry-date">Link Expiry</Label>
                <Input id="expiry-date" type="date" defaultValue="2024-08-30" />
            </div>
        </div>
        <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
