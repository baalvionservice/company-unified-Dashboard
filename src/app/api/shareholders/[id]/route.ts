
import { NextResponse } from 'next/server';
import shareholdersData from '@/lib/data/shareholders.json';

// In a real app, this would be a database.
let shareholders = [...shareholdersData];

// PUT /api/shareholders/:id - Update a shareholder
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const shareholderId = parseInt(params.id, 10);
    const index = shareholders.findIndex((s) => s.id === shareholderId);

    if (index === -1) {
      return NextResponse.json({ message: 'Shareholder not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, role, equity_percentage } = body;
    const originalShareholder = shareholders[index];
    const updatedShareholder = { ...originalShareholder, ...body };

    // --- Validation ---
    if (equity_percentage !== undefined) {
        if (typeof equity_percentage !== 'number' || equity_percentage <= 0) {
            return NextResponse.json({ message: 'Equity percentage must be a positive number' }, { status: 400 });
        }

        const totalEquityWithoutCurrent = shareholders
            .filter(s => s.id !== shareholderId)
            .reduce((sum, s) => sum + s.equity_percentage, 0);
        
        if (totalEquityWithoutCurrent + equity_percentage > 100) {
            return NextResponse.json({ message: `Updating to ${equity_percentage}% would exceed 100% total equity.` }, { status: 400 });
        }
    }
    // --- End Validation ---

    // Simulate update
    shareholders[index] = updatedShareholder;

    return NextResponse.json(updatedShareholder);
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

// DELETE /api/shareholders/:id - Delete a shareholder
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const shareholderId = parseInt(params.id, 10);
    const index = shareholders.findIndex((s) => s.id === shareholderId);

    if (index === -1) {
      return NextResponse.json({ message: 'Shareholder not found' }, { status: 404 });
    }

    // Simulate deletion
    shareholders.splice(index, 1);

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
