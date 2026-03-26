
import { NextResponse } from 'next/server';
import financialEntries from '@/lib/data/financial-entries.json';

// In a real app, this would be a database.
let entries = [...financialEntries];

// PUT /api/financials/:id - Update a financial entry
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entryId = parseInt(params.id, 10);
    const index = entries.findIndex((e) => e.id === entryId);

    if (index === -1) {
      return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }

    const body = await request.json();
    const { type, amount, date } = body;

    const updatedEntry = { ...entries[index], ...body };

    // Validation on updated data
    if (updatedEntry.type && updatedEntry.type !== 'Revenue' && updatedEntry.type !== 'Expense') {
        return NextResponse.json({ message: 'Invalid entry type' }, { status: 400 });
    }
    if (updatedEntry.amount && (typeof updatedEntry.amount !== 'number' || updatedEntry.amount <= 0)) {
        return NextResponse.json({ message: 'Amount must be a positive number' }, { status: 400 });
    }

    // Simulate update
    entries[index] = updatedEntry;

    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

// DELETE /api/financials/:id - Delete a financial entry
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entryId = parseInt(params.id, 10);
    const index = entries.findIndex((e) => e.id === entryId);

    if (index === -1) {
      return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }

    // Simulate deletion
    entries.splice(index, 1);

    return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
