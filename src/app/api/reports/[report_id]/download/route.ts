import { NextResponse } from 'next/server';
import reports from '@/lib/data/reports.json';

export async function GET(
  request: Request,
  { params }: { params: { report_id: string } }
) {
  try {
    const report = reports.find(r => r.id === params.report_id);
    if (!report) {
        // Forcing a mock for demonstration
        return NextResponse.json({ message: "This is a mock download link. In a real app, this would serve a file." });
    }

    // In a real app, you would fetch the file and return it.
    // For this mock, we'll just return a success message.
    return NextResponse.json({ 
        message: "Download initiated.",
        file_url: `/downloads/mock-report-${params.report_id}.pdf`
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
