import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  CircleDollarSign,
  Users,
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
import businessesData from '@/lib/data/businesses.json';
import type { Business } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import RevenueByBusinessChart from '@/components/charts/revenue-by-business-chart';
import OverallPerformanceChart from '@/components/charts/overall-performance-chart';
import AiInsightsCard from '@/components/ai-insights-card';

const businesses: Business[] = businessesData;
const totalRevenue = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.revenue / 83.5,
  0
);
const totalProfit = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.profit / 83.5,
  0
);
const totalEmployees = businesses.reduce(
  (acc, biz) => acc + biz.currentMetrics.employees,
  0
);

export default function DashboardPage() {
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
                ${(totalRevenue / 1000000).toFixed(2)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+20.1%</span> from last
                  month
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
                ${(totalProfit / 1000000).toFixed(2)}M
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
                Active Businesses
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businesses.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+1</span> since last quarter
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEmployees.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-2%</span> from last month
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
                          <TableCell className="text-right">
                            {biz.currency}{' '}
                            {(biz.currentMetrics.revenue / 1_000_000).toFixed(2)}
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
