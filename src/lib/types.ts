export type Role = "ADMIN" | "INVESTOR" | "CO_FOUNDER" | "EMPLOYEE";
export type Currency = "USD" | "INR" | "GBP" | "AED" | "SGD";
export type BusinessStatus = "Active" | "Growth" | "Review";

export interface Business {
  id: string;
  name: string;
  imageId: string;
  country: string;
  countryCode: string;
  currency: Currency;
  status: BusinessStatus;
  currentMetrics: {
    revenue: number;
    profit: number;
    employees: number;
    domains: number;
  };
  revenueHistory: { month: string; revenue: number; profit: number }[];
  equitySplit: { name: string; percentage: number }[];
  notableEvents: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  imageId: string;
}

export interface FxRate {
  [key: string]: number;
}

export type PaymentGateway = 'Stripe' | 'Razorpay' | 'PayPal';
export type TransactionStatus = 'Success' | 'Failed' | 'Pending';

export interface Transaction {
  id: string;
  businessId: string;
  gateway: PaymentGateway;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  fee: number;
  currency: Currency;
  status: TransactionStatus;
  date: string;
}

export type KpiPeriod = 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year';

export interface KpiData {
  businessId: string;
  revenue: {
    target: number;
    actual: number;
  };
  profitMargin: {
    value: number;
    trend: 'up' | 'down' | 'flat';
  };
  customers: {
    total: number;
    change: number;
  };
  returnRate: number;
  nps: number;
}

export interface AllKpis {
  [key: string]: KpiData[];
}
