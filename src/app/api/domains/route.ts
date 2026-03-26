import { NextResponse } from 'next/server';
import businesses from '@/lib/data/businesses.json';
import { Business } from '@/lib/types';

// This replaces the previous /api/dashboard/domains
export async function GET() {
  try {
    const domainFinancials = (businesses as Business[]).map(domain => {
      const revenue = domain.currentMetrics.revenue;
      const profit = domain.currentMetrics.profit;
      const expenses = revenue - profit;

      return {
        id: domain.id,
        name: domain.name,
        type: 'Software', // Mock type
        description: `Operations for ${domain.name}`, // Mock description
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, type, description } = body;
        if (!name || !type) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        const newDomain = {
            id: `biz_${Date.now()}`,
            name,
            type,
            description
        };
        // In a real app, you'd save this to the database
        console.log('Creating new domain:', newDomain);
        return NextResponse.json(newDomain, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}
