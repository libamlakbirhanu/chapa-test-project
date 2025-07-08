export interface AddAdminUserData {
  username: string;
  email: string;
  password: string;
  role: "admin" | "super-admin";
}

export interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  admins: number;
}

export interface PaymentSummaryType {
  userId: string;
  username: string;
  totalSent: number;
  totalReceived: number;
  transactionCount: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  active: boolean;
  balance: number;
}

export type Transaction = {
  id: number;
  amount: number;
  to: string;
  date: string;
};

export type Role = "user" | "admin" | "super-admin" | null;

export type AuthContextType = {
  user: { role: Role; email: string; username: string } | null;
  login: (user: { role: Role; email: string; username: string }) => void;
  logout: () => void;
};
