
import { NextResponse } from 'next/server';
import shareholdersData from '@/lib/data/shareholders.json';

// In a real app, this would be a database.
let shareholders = [...shareholdersData];

// GET /api/shareholders - List all shareholders
export async function GET() {
  return NextResponse.json(shareholders);
}

// POST /api/shareholders - Add a new shareholder
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, equity_percentage } = body;

    // --- Validation ---
    if (!name || !role || equity_percentage === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const validRoles = ["Founder", "CEO", "Investor", "Co-Founder"];
    if (!validRoles.includes(role)) {
        return NextResponse.json({ message: 'Invalid role specified' }, { status: 400 });
    }

    if (typeof equity_percentage !== 'number' || equity_percentage <= 0) {
        return NextResponse.json({ message: 'Equity percentage must be a positive number' }, { status: 400 });
    }
    
    const totalEquity = shareholders.reduce((sum, s) => sum + s.equity_percentage, 0);
    if (totalEquity + equity_percentage > 100) {
        return NextResponse.json({ message: `Adding ${equity_percentage}% would exceed 100% total equity.` }, { status: 400 });
    }
    // --- End Validation ---

    const newShareholder = {
      id: shareholders.length > 0 ? Math.max(...shareholders.map(s => s.id)) + 1 : 1,
      name,
      role,
      equity_percentage,
    };

    // Simulate adding to the database
    shareholders.push(newShareholder);

    return NextResponse.json(newShareholder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
