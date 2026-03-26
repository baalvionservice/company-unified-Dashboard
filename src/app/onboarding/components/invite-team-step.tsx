
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

interface InviteTeamStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function InviteTeamStep({ onNext, onBack }: InviteTeamStepProps) {
  const [invites, setInvites] = useState([{ email: '', role: 'Co-Founder' }]);

  const handleAddInvite = () => {
    setInvites([...invites, { email: '', role: 'Investor' }]);
  };
  
  const handleRemoveInvite = (index: number) => {
    setInvites(invites.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold">Invite Co-Founders / Investors</h3>
            <p className="text-sm text-muted-foreground">You can always do this later from the settings page.</p>
        </div>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {invites.map((invite, index) => (
                <div key={index} className="flex items-end gap-2">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor={`email-${index}`} className="text-xs">Email</Label>
                        <Input id={`email-${index}`} type="email" placeholder="name@company.com" />
                    </div>
                     <div className="w-[150px] space-y-1">
                        <Label htmlFor={`role-${index}`} className="text-xs">Role</Label>
                         <Select defaultValue="Co-Founder">
                            <SelectTrigger id={`role-${index}`}><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Co-Founder">Co-Founder</SelectItem>
                                <SelectItem value="Investor">Investor</SelectItem>
                                <SelectItem value="Employee">Employee</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveInvite(index)} disabled={invites.length <= 1}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
        
        <Button variant="link" onClick={handleAddInvite}><Plus className="mr-2 h-4 w-4" /> Add another</Button>

        <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onNext}>Skip for now</Button>
                <Button onClick={onNext}>Next</Button>
            </div>
        </div>
    </div>
  );
}
