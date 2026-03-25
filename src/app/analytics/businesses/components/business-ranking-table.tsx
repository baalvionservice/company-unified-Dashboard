
'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUp, ArrowDown, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import analyticsData from '@/lib/data/analytics-businesses.json';
import businessesData from '@/lib/data/businesses.json';
import countriesData from '@/lib/data/countries.json';
import DeepDive from './deep-dive';
import type { Business } from '@/lib/types';

const rankingData = analyticsData.ranking;
const allBusinesses: Business[] = businessesData;

const getTrendIcon = (trend: 'up' | 'down' | 'flat') => {
  if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <ArrowRight className="h-4 w-4 text-gray-500" />;
};

export default function BusinessRankingTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (businessId: string) => {
    setExpandedRow(expandedRow === businessId ? null : businessId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Ranking</CardTitle>
        <CardDescription>
          Businesses ranked by a composite performance score. Click a row to see more details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Revenue (MoM)</TableHead>
                <TableHead className="text-right">Growth</TableHead>
                <TableHead className="text-right">Profit Margin</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="w-24 text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((item) => {
                const business = allBusinesses.find((b) => b.id === item.businessId);
                const country = countriesData.find(c => c.name === business?.country);
                if (!business) return null;
                const isExpanded = expandedRow === item.businessId;

                return (
                  <React.Fragment key={item.businessId}>
                    <TableRow onClick={() => toggleRow(item.businessId)} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-bold">{item.rank}</TableCell>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell className="text-center">{country?.flag}</TableCell>
                      <TableCell className="text-right">${(item.revenue / 1000).toFixed(0)}K</TableCell>
                      <TableCell className="text-right text-green-600">+{item.growth}%</TableCell>
                      <TableCell className="text-right">{item.profit}%</TableCell>
                      <TableCell className="text-right font-bold text-lg">{item.score}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                           {getTrendIcon(item.trend as any)}
                           <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="bg-muted/30 hover:bg-muted/40">
                        <TableCell colSpan={8} className="p-0">
                          <DeepDive businessId={item.businessId} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
