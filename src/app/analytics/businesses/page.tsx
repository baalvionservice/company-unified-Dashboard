
import BusinessRankingTable from './components/business-ranking-table';
import ComparisonCharts from './components/comparison-charts';

export default function BusinessAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
        <p className="text-muted-foreground">
          Rank and compare the performance of your business units.
        </p>
      </div>

      <BusinessRankingTable />
      
      <ComparisonCharts />

    </div>
  );
}
