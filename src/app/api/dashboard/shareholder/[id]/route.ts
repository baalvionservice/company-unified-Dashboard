import { NextResponse } from "next/server";
import shareholdersData from "@/lib/data/shareholders.json";
import profitDistributions from "@/lib/data/profit-distributions.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shareholderId = parseInt(id, 10);
    const shareholder = shareholdersData.find((s) => s.id === shareholderId);

    if (!shareholder) {
      return NextResponse.json(
        { message: "Shareholder not found" },
        { status: 404 }
      );
    }

    // For mock purposes, find the earnings from the latest distribution
    const latestDistribution = profitDistributions[0];
    const earnings = latestDistribution?.payouts.find(
      (p) => p.shareholder_id === shareholderId
    );

    const profit_earned = earnings ? earnings.amount : 0;

    return NextResponse.json({
      shareholder_id: shareholder.id,
      name: shareholder.name,
      role: shareholder.role,
      equity_percentage: shareholder.equity_percentage,
      profit_earned: profit_earned,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
