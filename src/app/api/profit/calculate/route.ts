import { NextResponse } from "next/server";
import financialEntries from "@/lib/data/financial-entries.json";
import domains from "@/lib/data/businesses";
import { Business } from "@/lib/types";

export async function GET() {
  try {
    let total_revenue = 0;
    let total_expenses = 0;

    const domainProfits = (domains as Business[]).map((domain) => {
      // This is mock logic. In a real app, you'd fetch entries for the domain.
      // For now, we'll use the pre-calculated metrics.
      const revenue = domain.currentMetrics.revenue;
      const profit = domain.currentMetrics.profit;
      const expenses = revenue - profit;

      total_revenue += revenue;
      total_expenses += expenses;

      return {
        id: domain.id,
        name: domain.name,
        revenue,
        expenses,
        profit,
      };
    });

    const total_profit = total_revenue - total_expenses;

    return NextResponse.json({
      total_revenue,
      total_expenses,
      total_profit,
      domains: domainProfits,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
