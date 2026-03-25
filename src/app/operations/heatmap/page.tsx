'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import heatmapData from '@/lib/data/heatmap.json';
import { cn } from '@/lib/utils';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getPerfColor = (achievement: number) => {
  if (achievement >= 1.2) return 'bg-green-700 hover:bg-green-600';
  if (achievement >= 1.0) return 'bg-green-500 hover:bg-green-400';
  if (achievement >= 0.8) return 'bg-yellow-500 hover:bg-yellow-400';
  if (achievement >= 0.6) return 'bg-orange-500 hover:bg-orange-400';
  return 'bg-red-600 hover:bg-red-500';
};

const legend = [
  { label: '<60%', color: 'bg-red-600' },
  { label: '60-80%', color: 'bg-orange-500' },
  { label: '80-100%', color: 'bg-yellow-500' },
  { label: '100-120%', color: 'bg-green-500' },
  { label: '>120%', color: 'bg-green-700' },
];

export default function PerformanceHeatmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Performance Heatmap
        </h1>
        <p className="text-muted-foreground">
          Weekly performance overview by business against revenue targets.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This Week&apos;s Performance</CardTitle>
          <CardDescription>
            Each cell represents the daily revenue achievement against its
            target.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="grid gap-1">
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-1">
                <div className="font-bold"></div>
                {days.map((day) => (
                  <div key={day} className="text-center font-bold">
                    {day}
                  </div>
                ))}
              </div>
              {/* Data Rows */}
              {heatmapData.map((business) => (
                <div key={business.businessId} className="grid grid-cols-8 gap-1 items-center">
                  <div className="font-bold text-sm pr-2 text-right">{business.businessName}</div>
                  {business.dailyPerformance.map((perf) => {
                    const achievement = perf.revenue / perf.target;
                    return (
                      <Tooltip key={perf.day}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              'h-12 w-full rounded-md cursor-pointer transition-colors',
                              getPerfColor(achievement)
                            )}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-bold">{business.businessName} - {perf.day}</p>
                          <p>Revenue: ${perf.revenue.toLocaleString()}</p>
                          <p>Target: ${perf.target.toLocaleString()}</p>
                          <p>Achievement: {(achievement * 100).toFixed(1)}%</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader className='pb-2'>
            <CardTitle className='text-base'>Legend</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="flex items-center justify-center gap-4">
                {legend.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                    <div className={cn('h-4 w-4 rounded', item.color)}></div>
                    <span className="text-xs">{item.label}</span>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
