export const toggleUserStatus = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to toggle user status");
  return res.json();
};

export const removeEmployee = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to remove user");
  return res.json();
};

export const getUser = async (email: string) => {
  const res = await fetch(`/api/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to remove user");
  return res.json();
};

export interface AddAdminUserData {
  username: string;
  email: string;
  password: string;
  role: "admin" | "super-admin";
}

export const addAdminUser = async (userData: AddAdminUserData) => {
  const res = await fetch("/api/admins/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to add admin user");
  return res.json();
};

export const fetchWallet = async () => {
  const res = await fetch("/api/wallet");
  if (!res.ok) throw new Error("Failed to fetch wallet");
  return res.json();
};

export const fetchTransactions = async () => {
  const res = await fetch("/api/transactions");
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const fetchMyTransactions = async (email: string) => {
  const res = await fetch(`/api/transactions/mine?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const fetchCompanyUsers = async (email: string) => {
  const res = await fetch(`/api/company-users?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

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

export const fetchSystemStats = async (): Promise<SystemStats> => {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to fetch system statistics");
  return res.json();
};

export const fetchPaymentSummaries = async (): Promise<
  PaymentSummaryType[]
> => {
  const res = await fetch("/api/payment-summary");
  if (!res.ok) throw new Error("Failed to fetch payment summaries");
  return res.json();
};
