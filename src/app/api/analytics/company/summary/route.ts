import { NextResponse } from "next/server";
import businesses from "@/lib/data/businesses";
import fxRates from "@/lib/data/fx-rates.json";
import { Business, FxRate } from "@/lib/types";

export async function GET() {
  try {
    const rates: FxRate = fxRates;

    const total_revenue = (businesses as Business[]).reduce(
      (acc, biz) =>
        acc + biz.currentMetrics.revenue / (rates[biz.currency] || 1),
      0
    );
    const total_profit = (businesses as Business[]).reduce(
      (acc, biz) =>
        acc + biz.currentMetrics.profit / (rates[biz.currency] || 1),
      0
    );
    const total_expenses = total_revenue - total_profit;
    const profit_margin_percentage =
      total_revenue > 0 ? (total_profit / total_revenue) * 100 : 0;

    // Mock trend data
    const trend = [
      { month: "Jan 2026", profit: 7000 },
      { month: "Feb 2026", profit: 8500 },
      { month: "Mar 2026", profit: 9000 },
    ];

    return NextResponse.json({
      total_revenue,
      total_expenses,
      total_profit,
      profit_margin_percentage: parseFloat(profit_margin_percentage.toFixed(2)),
      trend,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
