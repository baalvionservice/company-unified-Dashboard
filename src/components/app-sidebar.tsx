
'use client';

import {
  Banknote,
  BarChart2,
  Book,
  Briefcase,
  Building,
  CalendarCheck,
  ChevronDown,
  CircleDollarSign,
  Cpu,
  DollarSign,
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Map,
  RefreshCw,
  Settings,
  Shield,
  ShieldCheck,
  Target,
  Users,
  Wand2,
  Grid3x3,
  BellRing,
  Bell,
  PiggyBank,
  TrendingUp,
  BookLock,
  ShieldAlert,
  Scaling,
  BrainCircuit,
  BookCopy,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import businessesData from '@/lib/data/businesses.json';
import users from '@/lib/data/users.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Business } from '@/lib/types';

const allBusinesses: Business[] = businessesData;

const BaalvionLogo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 120 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-auto"
  >
    <path
      d="M13.298 2.09999C6.206 2.09999 0.5 7.80599 0.5 14.898C0.5 21.99 6.206 27.696 13.298 27.696C18.686 27.696 22.844 24.594 24.542 20.07L19.226 17.844C18.266 20.124 16.04 21.822 13.298 21.822C9.59 21.822 6.62 18.792 6.62 14.898C6.62 11.004 9.59 7.97399 13.298 7.97399C16.04 7.97399 18.266 9.67199 19.226 11.952L24.542 9.72599C22.844 5.19599 18.686 2.09999 13.298 2.09999ZM32.4132 2.65199V27.148H38.5332V16.894L43.8492 27.148H49.1652L43.4592 16.204C47.3532 15.31 49.8552 11.806 49.8552 7.82799C49.8552 3.84999 46.8852 0.983989 42.1752 0.983989H32.4132V2.65199ZM38.5332 6.15999V8.51799H42.5832C43.9152 8.51799 44.8752 7.62399 44.8752 6.46399C44.8752 5.30399 43.9152 4.40799 42.5832 4.40799H38.5332V6.15999ZM57.5133 27.148H72.2913V21.274H63.6333V2.65199H57.5133V27.148ZM79.6233 27.148H85.7433V2.65199H79.6233V27.148ZM92.1783 2.09999C87.4683 2.09999 83.6403 5.75999 83.6403 10.944L83.7123 18.864C83.7123 24.048 87.4683 27.708 92.1783 27.708C96.8883 27.708 100.716 24.048 100.716 18.864L100.644 10.944C100.644 5.75999 96.8883 2.09999 92.1783 2.09999ZM92.1783 21.93C90.2223 21.93 89.6523 20.052 89.6523 18.864L89.5803 10.944C89.5803 9.75599 90.2223 7.87799 92.1783 7.87799C94.1343 7.87799 94.7043 9.75599 94.7043 10.944L94.7763 18.864C94.7763 20.052 94.1343 21.93 92.1783 21.93ZM104.918 27.148H119.696V21.274H111.038V2.65199H104.918V27.148Z"
      className="fill-sidebar-foreground"
    />
  </svg>
);

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/operations', icon: LayoutDashboard, label: 'Daily Ops' },
  { href: '/operations/heatmap', icon: Grid3x3, label: 'Heatmap' },
  { href: '/operations/alerts', icon: BellRing, label: 'Alerts' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/employees', icon: Users, label: 'Employees' },
  { href: '/employees/attendance', icon: CalendarCheck, label: 'Attendance' },
  { href: '/employees/tasks', icon: ListChecks, label: 'Tasks' },
  { href: '/employees/departments', icon: Building, label: 'Departments' },
  { href: '/kpis', icon: Target, label: 'KPIs' },
  { href: '/payments', icon: CircleDollarSign, label: 'Payments' },
  { href: '/finance', icon: PiggyBank, label: 'Finance Overview' },
  { href: '/financials/global', icon: Banknote, label: 'Global Financials' },
  { href: '/finance/reports', icon: Book, label: 'Ad-hoc Reports' },
  { href: '/reports', icon: BookCopy, label: 'Exec. Reports' },
  { href: '/currencies', icon: DollarSign, label: 'FX Rates' },
  { href: '/countries', icon: Map, label: 'Countries' },
  { href: '/equity', icon: FileText, label: 'Equity' },
  { href: '/analytics/businesses', icon: BarChart2, label: 'Business Analytics' },
  { href: '/analytics/forecast', icon: TrendingUp, label: 'Forecasting' },
  { href: '/analytics/domains', icon: Globe, label: 'Domains' },
  { href: '/automation', icon: Wand2, label: 'Automation' },
  { href: '/ai', icon: Cpu, label: 'AI Intelligence' },
  { href: '/ai/simulator', icon: Scaling, label: 'Century Simulator' },
  { href: '/ai/strategy', icon: BrainCircuit, label: 'Strategic Planner' },
  { href: '/sync', icon: RefreshCw, label: 'Sync' },
  { href: '/compliance', icon: ShieldCheck, label: 'Compliance' },
  { href: '/compliance/gdpr', icon: BookLock, label: 'GDPR' },
  { href: '/security/audit', icon: Shield, label: 'Audit Logs' },
  { href: '/security/permissions', icon: ShieldAlert, label: 'Permissions' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const currentUser = users[0];
  const userImage = PlaceHolderImages.find(
    (img) => img.id === currentUser.imageId
  );

  let businesses = allBusinesses;

  if (role === 'INVESTOR') {
    // As per prompt: TechCorp India, RetailChain UAE, DigitalAgency SG
    const investorBusinessIds = ['biz_1', 'biz_3', 'biz_5'];
    businesses = allBusinesses.filter((b) => investorBusinessIds.includes(b.id));
  } else if (role === 'CO_FOUNDER') {
    // As per prompt: TechCorp India, FinanceHub USA
    const coFounderBusinessIds = ['biz_1', 'biz_4'];
    businesses = allBusinesses.filter((b) =>
      coFounderBusinessIds.includes(b.id)
    );
  } else if (role === 'EMPLOYEE') {
    // An employee belongs to one business. Let's say DigitalAgency SG for Li Wei.
    const employeeBusinessId = 'biz_5';
    businesses = allBusinesses.filter((b) => b.id === employeeBusinessId);
  }


  return (
    <Sidebar>
      <SidebarHeader className="h-auto p-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-auto w-full items-center justify-between p-2 hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-sidebar-foreground">
                    All Businesses
                  </p>
                  <p className="text-xs text-sidebar-foreground/70">
                    Admin Group
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64"
            align="start"
            side="bottom"
            sideOffset={10}
          >
            <DropdownMenuLabel>Switch Business Group</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {businesses.map((biz) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === biz.imageId
              );
              return (
                <DropdownMenuItem key={biz.id}>
                  <Avatar className="mr-2 h-6 w-6">
                    {image && <AvatarImage src={image.imageUrl} />}
                    <AvatarFallback>{biz.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{biz.name}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={{ pathname: item.href, query: { role: role || undefined } }} passHref>
                <SidebarMenuButton
                  isActive={
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname.startsWith(item.href))
                  }
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 p-2 hover:bg-sidebar-accent"
            >
              <Avatar className="h-8 w-8">
                {userImage && <AvatarImage src={userImage.imageUrl} />}
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-left">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {currentUser.name}
                </p>
                <Badge
                  variant="outline"
                  className="h-5 border-sidebar-border bg-sidebar-accent text-xs capitalize text-sidebar-accent-foreground"
                >
                  {currentUser.role.toLowerCase().replace('_', '-')}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" side="top">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="p-2 text-center text-xs text-sidebar-foreground/50">
          <BaalvionLogo />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
