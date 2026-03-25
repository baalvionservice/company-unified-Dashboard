
'use client';
import {
  ArrowUp,
  Briefcase,
  CircleDollarSign,
  Users,
  BellRing,
  Activity,
  Building,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import businessesData from '@/lib/data/businesses.json';
import fxRatesData from '@/lib/data/fx-rates.json';
import type { Business, FxRate, BusinessStatus } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import RevenueByBusinessChart from '@/components/charts/revenue-by-business-chart';
import OverallPerformanceChart from '@/components/charts/overall-performance-chart';
import AiInsightsCard from '@/components/ai-insights-card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import operationsData from '@/lib/data/operations.json';
import alertsData from '@/lib/data/alerts.json';
import Link from 'next/link';

const businesses: Business[] = businessesData;
const fxRates: FxRate = fxRatesData;

const totalRevenue = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.revenue / (fxRates[biz.currency] || 1),
  0
);
const totalProfit = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.profit / (fxRates[biz.currency] || 1),
  0
);
const totalEmployees = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.employees,
  0
);
const countryCount = new Set(businesses.map((b) => b.country)).size;

const statusColors: Record<BusinessStatus, string> = {
  Active:
    'border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-300',
  Growth:
    'border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Review:
    'border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
};

const getIconForActivity = (description: string) => {
    if (description.includes('order')) return <CircleDollarSign className="h-4 w-4" />;
    if (description.includes('clocked in')) return <Users className="h-4 w-4" />;
    return <Briefcase className="h-4 w-4" />;
}

export default function AdminView() {
  const isMobile = useIsMobile();
  const revenueToday = operationsData.snapshot.todaysRevenue;
  const recentAlerts = alertsData.slice(0, 3);
  const recentActivities = operationsData.activityFeed.slice(0, 5);
  
  if (isMobile) {
    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">${revenueToday.toLocaleString()}</p>
                </CardContent>
            </Card>
            <div className="grid grid-cols-3 gap-2">
                <Button asChild variant="outline" className="flex-col h-20"><Link href="/analytics/businesses"><Building /><span className="text-xs mt-1">Businesses</span></Link></Button>
                <Button asChild variant="outline" className="flex-col h-20"><Link href="/finance"><PiggyBank /><span className="text-xs mt-1">Finance</span></Link></Button>
                <Button asChild variant="outline" className="flex-col h-20"><Link href="/employees"><Users /><span className="text-xs mt-1">Employees</span></Link></Button>
            </div>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><BellRing /> Recent Alerts</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {recentAlerts.map(alert => (
                        <div key={alert.id} className="text-sm">{alert.title}</div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Activity /> Activity Feed</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {recentActivities.map(activity => (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mt-1">{getIconForActivity(activity.description)}</div>
                            <div>
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.business} - {activity.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s a look at your business empire.
        </p>
      </div>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.4%</span> vs last month
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(totalProfit / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+18.3%</span> from last
                  month
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Businesses
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businesses.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {countryCount} countries
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEmployees.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+2%</span> from last quarter
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
            <OverallPerformanceChart />
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
                <CardDescription>
                  A summary of all your managed businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Profit</TableHead>
                      <TableHead className="text-right">Employees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.map((biz) => {
                      const image = PlaceHolderImages.find(
                        (img) => img.id === biz.imageId
                      );
                      return (
                        <TableRow key={biz.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                {image && (
                                  <AvatarImage
                                    src={image.imageUrl}
                                    alt={biz.name}
                                    data-ai-hint={image.imageHint}
                                  />
                                )}
                                <AvatarFallback>
                                  {biz.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{biz.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{biz.country}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                'capitalize',
                                statusColors[biz.status]
                              )}
                            >
                              {biz.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {biz.currency}{' '}
                            {(
                              biz.currentMetrics.revenue / 1_000_000
                            ).toFixed(2)}
                            M
                          </TableCell>
                          <TableCell className="text-right">
                            {biz.currency}{' '}
                            {(biz.currentMetrics.profit / 1_000_000).toFixed(2)}
                            M
                          </TableCell>
                          <TableCell className="text-right">
                            {biz.currentMetrics.employees.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-8">
            <RevenueByBusinessChart />
            <AiInsightsCard />
          </div>
        </div>
      </div>
    </>
  );
}
