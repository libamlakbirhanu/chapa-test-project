// src/pages/DashboardUser.tsx
import { fetchMyTransactions, fetchWallet } from "@/api";
import ActionMenu from "@/components/action-menu";
import ChartPanel from "@/components/chart-panel";
import PromoBanner from "@/components/ui/promo-banner";
import TransactionList from "@/components/transaction-list";
import TransactionModal from "@/components/transaction-modal";
import WalletCard from "@/components/wallet-card";
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    data: wallet,
    isLoading: walletLoading,
    isError: walletError,
  } = useQuery({ queryKey: ["wallet"], queryFn: fetchWallet });

  const {
    data: transactions,
    isLoading: txLoading,
    isError: txError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchMyTransactions(user?.email || ""),
  });

  return (
    <>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="space-y-6">
        {/* Action Buttons */}
        <ActionMenu onSend={() => setIsModalOpen(true)} />

        <div className="flex flex-col md:flex-row gap-6">
          <PromoBanner />
          {/* Wallet Card */}
          {walletError ? (
            <p className="text-red-500">Error loading wallet</p>
          ) : (
            <WalletCard
              cardNumber="**** **** **** 1234"
              userName={user?.username}
              balance={wallet?.balance || 0}
              loading={walletLoading}
            />
          )}
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div className="md:col-span-2 col-span-1">
            {/* Transactions */}
            {txError ? (
              <p className="text-red-500">Failed to load transactions</p>
            ) : (
              <TransactionList
                transactions={transactions}
                loading={txLoading}
              />
            )}
          </div>

          <ChartPanel />
        </div>
      </div>
    </>
  );
}
