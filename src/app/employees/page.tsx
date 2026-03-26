
'use client';
import EmployeeStats from './components/employee-stats';
import EmployeeTable from './components/employee-table';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const isDemo = localStorage.getItem('baalvion_demo_mode') === 'true';
    const setupComplete = localStorage.getItem('setup_complete') === 'true';
    if (!isDemo && !setupComplete) {
      setIsNewUser(true);
    }
  }, []);

  if (isNewUser) {
    return (
       <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                <p className="text-muted-foreground">
                Manage and view all personnel across your businesses.
                </p>
            </div>
            <EmptyState
                title="Add your first employee"
                description="Your employee directory is empty. Invite your team members to get started with managing payroll, roles, and permissions."
                imageSeed="team-working"
                imageHint="people working office"
                actionButton={<Button size="lg"><PlusCircle className="mr-2" /> Add Employee</Button>}
            />
        </div>
    );
  }

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
