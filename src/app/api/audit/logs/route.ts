import { NextResponse } from 'next/server';
import auditLogs from '@/lib/data/audit-logs.json';

export async function GET(request: Request) {
  try {
    // In a real app, you would add filtering based on query params
    return NextResponse.json(auditLogs);
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // In a real app, you'd save this to the database
        console.log('New audit log:', body);
        const newLog = { id: auditLogs.length + 1, timestamp: new Date().toISOString(), ...body };
        return NextResponse.json(newLog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}
