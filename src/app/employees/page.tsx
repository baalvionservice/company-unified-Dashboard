
import EmployeeStats from './components/employee-stats';
import EmployeeTable from './components/employee-table';

export default function EmployeesPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    business?: string;
    country?: string;
    department?: string;
    status?: string;
    page?: string;
  };
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <p className="text-muted-foreground">
          Manage and view all personnel across your businesses.
        </p>
      </div>

      <EmployeeStats />
      
      <EmployeeTable searchParams={searchParams} />

    </div>
  );
}
