import type { Role } from '@/lib/types';
import AdminView from './admin-view';
import InvestorView from './investor-view';
import CoFounderView from './co-founder-view';
import EmployeeView from './employee-view';

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { role?: Role };
}) {
  const role = searchParams?.role;

  switch (role) {
    case 'INVESTOR':
      return <InvestorView />;
    case 'CO_FOUNDER':
      return <CoFounderView />;
    case 'EMPLOYEE':
      return <EmployeeView />;
    default:
      return <AdminView />;
  }
}
