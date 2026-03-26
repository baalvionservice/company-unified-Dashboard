import { NextResponse } from 'next/server';
import businesses from '@/lib/data/businesses.json';
import { Business } from '@/lib/types';

export async function GET(request: Request) {
  try {
    // This is mock logic. A real implementation would filter by date and domain.
    const firstBusiness = businesses[0] as Business;
    const trendData = firstBusiness.revenueHistory.map(item => ({
        date: item.month, // Using month as date for mock purposes
        revenue: item.revenue * 1000000,
        expenses: (item.revenue - item.profit) * 1000000,
        profit: item.profit * 1000000
    }));

    return NextResponse.json({
        domain_id: firstBusiness.id,
        name: firstBusiness.name,
        trend: trendData
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
