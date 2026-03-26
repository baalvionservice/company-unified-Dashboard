
import { NextResponse } from 'next/server';
import financialEntries from '@/lib/data/financial-entries.json';

// GET /api/financials/domain/:domain_id
export async function GET(
  request: Request,
  { params }: { params: { domain_id: string } }
) {
  try {
    const domainId = parseInt(params.domain_id, 10);

    if (isNaN(domainId)) {
        return NextResponse.json({ message: 'Invalid domain ID' }, { status: 400 });
    }

    const domainEntries = financialEntries.filter(
      (entry) => entry.domain_id === domainId
    );
    
    return NextResponse.json({
        domain_id: domainId,
        entries: domainEntries,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
