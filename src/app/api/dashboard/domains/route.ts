
import { NextResponse } from 'next/server';
import businesses from '@/lib/data/businesses.json';
import { Business } from '@/lib/types';

export async function GET() {
  try {
    const domainFinancials = (businesses as Business[]).map(domain => {
      const revenue = domain.currentMetrics.revenue;
      const profit = domain.currentMetrics.profit;
      const expenses = revenue - profit;

      return {
        id: domain.id,
        name: domain.name,
        revenue,
        expenses,
        profit
      };
    });

    return NextResponse.json({
      domains: domainFinancials
    });

  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
