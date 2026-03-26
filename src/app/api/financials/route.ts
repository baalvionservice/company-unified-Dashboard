
import { NextResponse } from 'next/server';
import financialEntries from '@/lib/data/financial-entries.json';

// In a real app, this would be a database.
let entries = [...financialEntries];

// POST /api/financials - Add a new financial entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain_id, type, amount, date } = body;

    // Basic validation
    if (!domain_id || !type || !amount || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (type !== 'Revenue' && type !== 'Expense') {
      return NextResponse.json({ message: 'Invalid entry type' }, { status: 400 });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return NextResponse.json({ message: 'Amount must be a positive number' }, { status: 400 });
    }

    const newEntry = {
      id: entries.length + 1,
      domain_id,
      type,
      amount,
      date,
    };

    // Simulate adding to the database
    entries.push(newEntry);

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
