// src/components/TransactionList.tsx
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import TransactionSkeletonLoader from "./ui/transaction-skeleton-loader";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

type Transaction = {
  id: number;
  amount: number;
  to: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
  loading: boolean;
};

const TransactionSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <TransactionSkeletonLoader key={i} />
    ))}
  </div>
);

export default function TransactionList({ transactions, loading }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      {loading ? (
        <TransactionSkeleton />
      ) : transactions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No transactions yet
        </p>
      ) : (
        <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {transactions.map((tx) => {
            const isIncoming = tx.amount > 0;

            return (
              <Transition
                key={tx.id}
                appear
                as={Fragment}
                show={true}
                enter="transition-all duration-500"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
              >
                <li
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        isIncoming
                          ? "bg-green-900/30 text-green-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {isIncoming ? (
                        <ArrowDownRightIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        <ArrowUpRightIcon className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{tx.to}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>

                  <div
                    className={`font-semibold ${
                      isIncoming ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isIncoming ? "+" : "-"}${Math.abs(tx.amount)}
                  </div>
                </li>
              </Transition>
            );
          })}
        </ul>
      )}
    </div>
  );
}
