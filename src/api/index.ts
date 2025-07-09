import { Inputs } from "@/pages/auth/login";
import { AddAdminUserData, PaymentSummaryType, SystemStats } from "@/types";

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

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to remove user");
  return res.json();
};

export const getUser = async (email: string) => {
  const res = await fetch(`/api/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to remove user");
  return data;
};

export const addAdminUser = async (userData: AddAdminUserData) => {
  const res = await fetch("/api/admins/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add admin user");
  return data;
};

export const fetchWallet = async () => {
  const res = await fetch("/api/wallet");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch wallet");
  return data;
};

export const fetchTransactions = async () => {
  const res = await fetch("/api/transactions");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch transactions");
  return data;
};

export const fetchMyTransactions = async (email: string) => {
  const res = await fetch(`/api/transactions/mine?email=${email}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch transactions");
  return data;
};

export const fetchUsers = async () => {
  const res = await fetch("/api/users");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch users");
  return data;
};

export const fetchCompanyUsers = async (email: string) => {
  const res = await fetch(`/api/company-users?email=${email}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch users");
  return data;
};

export const fetchSystemStats = async (): Promise<SystemStats> => {
  const res = await fetch("/api/stats");

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || "Failed to fetch system statistics");
  return data;
};

export const fetchPaymentSummaries = async (): Promise<
  PaymentSummaryType[]
> => {
  const res = await fetch("/api/payment-summary");

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || "Failed to fetch payment summaries");
  return data;
};

export const sendTransaction = async (form: {
  amount: string;
  to: string;
  userId: string;
}) => {
  const res = await fetch("/api/transactions/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to send transaction");
  }
  return res;
};

export const userLogin = async (input: Inputs) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
};
