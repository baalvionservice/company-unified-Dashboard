
import { NextResponse } from 'next/server';
import profitDistributions from '@/lib/data/profit-distributions.json';

// GET /api/distribution/history - Fetch past profit distributions
export async function GET() {
  try {
    // In a real app, this would fetch from the ProfitDistributions table.
    // For now, we return the mock data.
    return NextResponse.json(profitDistributions);
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
