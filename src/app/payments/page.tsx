import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  Transaction,
  PaymentGateway,
  TransactionStatus,
  Business,
} from '@/lib/types';
import transactionsData from '@/lib/data/transactions.json';
import businessesData from '@/lib/data/businesses.json';
import { FilterBar } from './components/filter-bar';
import { parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

type TransactionWithBusiness = Transaction & { businessName: string };

const PAGE_SIZE = 20;

const businesses: Business[] = businessesData;

const gatewayColors: Record<PaymentGateway, string> = {
  Stripe:
    'border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Razorpay:
    'border-orange-300 bg-orange-100 text-orange-800 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300',
  PayPal:
    'border-sky-300 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-300',
};

const statusConfig: Record<
  TransactionStatus,
  { icon: React.ElementType; color: string }
> = {
  Success: {
    icon: CheckCircle2,
    color:
      'border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-300',
  },
  Failed: {
    icon: XCircle,
    color:
      'border-red-300 bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-300',
  },
  Pending: {
    icon: Clock,
    color:
      'border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  },
};

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams?: {
    gateway?: string;
    status?: string;
    businessId?: string;
    from?: string;
    to?: string;
    page?: string;
  };
}) {
  const allTransactions: TransactionWithBusiness[] = transactionsData.map(
    (tx: Transaction) => {
      const business = businesses.find((b) => b.id === tx.businessId);
      return { ...tx, businessName: business?.name || 'N/A' };
    }
  );
  
  // Calculate stats from all transactions
  const totalCollected = allTransactions
    .filter((tx) => tx.status === 'Success')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const successfulTransactions = allTransactions.filter(
    (tx) => tx.status === 'Success'
  ).length;
  const failedTransactions = allTransactions.filter(
    (tx) => tx.status === 'Failed'
  ).length;
  const pendingPayouts = allTransactions
    .filter((tx) => tx.status === 'Pending')
    .reduce((sum, tx) => sum + tx.amount, 0);


  // Filtering logic
  const currentPage = Number(searchParams?.page || '1');
  const gateway = searchParams?.gateway;
  const status = searchParams?.status;
  const businessId = searchParams?.businessId;
  const from = searchParams?.from;
  const to = searchParams?.to;

  const filteredTransactions = allTransactions.filter((tx) => {
    if (gateway && gateway !== 'all' && tx.gateway !== gateway) return false;
    if (status && status !== 'all' && tx.status !== status) return false;
    if (businessId && businessId !== 'all' && tx.businessId !== businessId) return false;
    if (from && to) {
        const txDate = new Date(tx.date);
        const fromDate = startOfDay(new Date(from));
        const toDate = endOfDay(new Date(to));
        if (!isWithinInterval(txDate, { start: fromDate, end: toDate })) return false;
    }
    return true;
  });

  // Pagination logic
  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / PAGE_SIZE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Payments & Revenue
        </h1>
        <p className="text-muted-foreground">
          Track and manage all your transactions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Collected This Month
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCollected.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Transactions
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulTransactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Transactions
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedTransactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayouts.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            A list of recent transactions from all your businesses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FilterBar />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((tx) => {
                  const StatusIcon = statusConfig[tx.status].icon;
                  return (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.businessName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(gatewayColors[tx.gateway])}
                        >
                          {tx.gateway}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{tx.customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.customer.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.currency} {tx.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            'flex items-center gap-2',
                            statusConfig[tx.status].color
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span>{tx.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(tx.date), 'PPpp')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, totalTransactions)}
            </strong>{' '}
            of <strong>{totalTransactions}</strong> transactions
          </div>
           <div className="flex items-center gap-2">
            <Link href={`?page=${Math.max(1, currentPage - 1)}`} passHref>
                <Button variant="outline" size="sm" disabled={currentPage <= 1}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>
            </Link>
             <Link href={`?page=${Math.min(totalPages, currentPage + 1)}`} passHref>
                <Button variant="outline" size="sm" disabled={currentPage >= totalPages}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
