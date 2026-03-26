
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Search, AlertTriangle, DollarSign, Settings, Users, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import notificationsData from '@/lib/data/notifications.json';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Notification, NotificationType } from '@/lib/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import businessesData from '@/lib/data/businesses.json';
import TrialBanner from './trial-banner';
import RateLimitBanner from './rate-limit-banner';
import OfflineBanner from './offline-banner';
import { useState, useEffect } from 'react';


const notificationIcons: Record<NotificationType, React.ElementType> = {
  Alert: AlertTriangle,
  Finance: DollarSign,
  System: Settings,
  Team: Users,
};

const notificationColors: Record<NotificationType, string> = {
  Alert: 'text-red-500',
  Finance: 'text-green-500',
  System: 'text-blue-500',
  Team: 'text-purple-500',
};

function DemoBanner() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('baalvion_demo_mode') === 'true') {
      setIsDemoMode(true);
    }
  }, []);

  const handleExitDemo = () => {
    localStorage.removeItem('baalvion_demo_mode');
    router.push('/onboarding');
  };

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center gap-4 bg-orange-500 p-2 text-sm font-semibold text-white">
      <span>DEMO MODE</span>
      <Button
        variant="outline"
        size="sm"
        className="h-6 border-orange-300 bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
        onClick={handleExitDemo}
      >
        Exit Demo & Start Setup
      </Button>
    </div>
  );
}


export function Header() {
  const latestNotifications = notificationsData.slice(0, 5);
  const unreadCount = notificationsData.filter(n => !n.isRead).length;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBusiness = searchParams.get('businessId') || 'all';

  const handleBusinessChange = (businessId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (businessId === 'all') {
      params.delete('businessId');
    } else {
      params.set('businessId', businessId);
    }
    // when switching business, go to dashboard
    router.push(`/dashboard?${params.toString()}`);
  }


  return (
    <div className="sticky top-0 z-30 flex flex-col items-stretch bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
        <DemoBanner />
        <TrialBanner />
        <RateLimitBanner />
        <OfflineBanner />
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex w-full items-center gap-4">
                <Select value={selectedBusiness} onValueChange={handleBusinessChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <SelectValue placeholder="Select Business" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Businesses</SelectItem>
                    {businessesData.map(biz => (
                    <SelectItem key={biz.id} value={biz.id}>{biz.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <div className="relative ml-auto flex flex-1 items-center gap-2 md:grow-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                            {unreadCount > 0 && (
                                <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {unreadCount}
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-96">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="flex flex-col gap-1">
                            {latestNotifications.map((notification) => {
                                const Icon = notificationIcons[notification.type];
                                return (
                                    <DropdownMenuItem key={notification.id} asChild>
                                        <Link href="/notifications" className="flex items-start gap-3 !p-2">
                                            <Icon className={cn("mt-1 h-4 w-4", notificationColors[notification.type])} />
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">{notification.title}</p>
                                                <p className="text-xs text-muted-foreground">{notification.description}</p>
                                                <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</p>
                                            </div>
                                            {!notification.isRead && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>}
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                        <Link href="/notifications" className="w-full justify-center text-sm font-medium text-primary hover:text-primary/90">
                            View all notifications
                        </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                </div>
                <UserNav />
            </div>
        </header>
    </div>
  );
}
