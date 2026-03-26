import { NextResponse } from 'next/server';
import profitDistributions from '@/lib/data/profit-distributions.json';

export async function GET() {
  try {
    // This aggregates from the latest distribution for mock purposes
    const latestDistribution = profitDistributions[0];
    const shareholderPerformance = latestDistribution.payouts.map(payout => ({
      shareholder_id: payout.shareholder_id,
      name: payout.name,
      profit_earned: payout.amount
    }));

    return NextResponse.json(shareholderPerformance);
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
