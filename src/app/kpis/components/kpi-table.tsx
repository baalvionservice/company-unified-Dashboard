'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { KpiData } from '@/lib/types';
import businesses from '@/lib/data/businesses.json';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

interface KpiTableProps {
  kpiData: KpiData[];
}

export default function KpiTable({ kpiData }: KpiTableProps) {

  const getAchievementColor = (achievement: number) => {
    if (achievement > 90) return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-300';
    if (achievement >= 70) return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'flat') => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500 inline-block ml-1" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500 inline-block ml-1" />;
    return <ArrowRight className="h-4 w-4 text-gray-500 inline-block ml-1" />;
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Global KPI Summary</CardTitle>
            <CardDescription>A comparative overview of all business units for the selected period.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Business</TableHead>
                <TableHead className="text-right">Revenue Target</TableHead>
                <TableHead className="text-right">Actual Revenue</TableHead>
                <TableHead className="text-right">Achievement</TableHead>
                <TableHead className="text-right">Profit Margin</TableHead>
                <TableHead className="text-right">Customers</TableHead>
                <TableHead className="text-right">NPS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {kpiData.map((kpi) => {
                    const business = businesses.find(b => b.id === kpi.businessId);
                    if (!business) return null;
                    const achievement = (kpi.revenue.actual / kpi.revenue.target) * 100;
                    
                    return (
                        <TableRow key={kpi.businessId}>
                            <TableCell className="font-medium">{business.name}</TableCell>
                            <TableCell className="text-right">${kpi.revenue.target.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-semibold">${kpi.revenue.actual.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant="outline" className={cn(getAchievementColor(achievement))}>{achievement.toFixed(1)}%</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {kpi.profitMargin.value.toFixed(1)}%
                                {getTrendIcon(kpi.profitMargin.trend)}
                            </TableCell>
                            <TableCell className="text-right">{kpi.customers.total.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{kpi.nps}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
