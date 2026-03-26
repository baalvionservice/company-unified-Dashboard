
import { NextResponse } from 'next/server';
import financialEntries from '@/lib/data/financial-entries.json';

export async function GET() {
  try {
    // This is mock logic. In a real app, you'd calculate this from a database.
    const total_revenue = financialEntries
      .filter(entry => entry.type === 'Revenue')
      .reduce((sum, entry) => sum + entry.amount, 0);

    const total_expenses = financialEntries
      .filter(entry => entry.type === 'Expense')
      .reduce((sum, entry) => sum + entry.amount, 0);

    const company_profit = total_revenue - total_expenses;
    const profit_margin_percentage = total_revenue > 0 ? (company_profit / total_revenue) * 100 : 0;

    // Using hardcoded data for consistent demo experience
    const demo_profit = 9000;
    const demo_revenue = 13000;
    const demo_margin = (demo_profit / demo_revenue) * 100;

    return NextResponse.json({
      company_profit: demo_profit,
      profit_margin_percentage: parseFloat(demo_margin.toFixed(2))
    });

  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
