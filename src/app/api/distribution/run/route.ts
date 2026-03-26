
import { NextResponse } from 'next/server';
import shareholdersData from '@/lib/data/shareholders.json';
// In a real app, you'd import a database client to write to the ProfitDistributions table.
// For this mock, we'll just perform the calculation and return the result.

// POST /api/distribution/run - Run a new profit distribution
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total_profit, retention_percentage, date } = body;

    // --- Validation ---
    if (total_profit === undefined || retention_percentage === undefined || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (typeof total_profit !== 'number' || total_profit < 0) {
      return NextResponse.json({ message: 'Total profit must be a non-negative number' }, { status: 400 });
    }
    if (typeof retention_percentage !== 'number' || retention_percentage < 0 || retention_percentage > 100) {
      return NextResponse.json({ message: 'Retention percentage must be between 0 and 100' }, { status: 400 });
    }
    // --- End Validation ---

    const retainedProfit = total_profit * (retention_percentage / 100);
    const distributableProfit = total_profit - retainedProfit;

    const payouts = shareholdersData.map(shareholder => {
      const payoutAmount = distributableProfit * (shareholder.equity_percentage / 100);
      return {
        shareholder_id: shareholder.id,
        name: shareholder.name,
        role: shareholder.role,
        amount: parseFloat(payoutAmount.toFixed(2)) // Ensure 2 decimal places
      };
    });

    const newDistribution = {
      date,
      total_profit,
      retention_percentage,
      retained_amount: parseFloat(retainedProfit.toFixed(2)),
      distributed_amount: parseFloat(distributableProfit.toFixed(2)),
      payouts
    };

    // In a real app, you would save `newDistribution` to your database here.
    // For this mock API, we'll just return the calculated result.

    return NextResponse.json(newDistribution, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
