'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, LogOut, Settings, User, Users } from 'lucide-react';
import users from '@/lib/data/users.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Role } from '@/lib/types';

export function UserNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = users[0]; // Mock current user
  const userImage = PlaceHolderImages.find(
    (img) => img.id === currentUser.imageId
  );
  const roles: Role[] = ['ADMIN', 'INVESTOR', 'CO_FOUNDER', 'EMPLOYEE'];
  const currentRole = (searchParams.get('role') as Role) || 'ADMIN';

  const handleRoleChange = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role === 'ADMIN') {
      params.delete('role');
    } else {
      params.set('role', role);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {userImage && (
              <AvatarImage
                src={userImage.imageUrl}
                alt={currentUser.name}
                data-ai-hint={userImage.imageHint}
              />
            )}
            <AvatarFallback>
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            <span>Switch Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={currentRole}
                onValueChange={handleRoleChange}
              >
                {roles.map((role) => (
                  <DropdownMenuRadioItem key={role} value={role}>
                    {role
                      .charAt(0) +
                      role.slice(1).toLowerCase().replace(/_/g, '-')}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
