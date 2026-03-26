import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Generating report with options:", body);
    
    // In a real app, this would trigger a background job to generate the report
    const newReport = {
        report_id: `rep_${Date.now()}`,
        status: "generating",
        ...body
    };

    return NextResponse.json(newReport, { status: 202 }); // Accepted
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
