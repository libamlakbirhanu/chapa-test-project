import WalletSkeletonLoader from "./ui/wallet-skeleton-loader";

// src/components/WalletCard.tsx
type WalletCardProps = {
  balance: number;
  cardNumber?: string;
  userName?: string;
  loading: boolean;
};

export default function WalletCard({
  balance,
  cardNumber = "**** **** **** 1234",
  userName = "Libamlak Birhanu",
  loading = false,
}: WalletCardProps) {
  return loading || !balance ? (
    <WalletSkeletonLoader />
  ) : (
    <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl p-6 backdrop-blur-md bg-white/10 border border-white/20 text-white">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm text-gray-300">Available Balance</h4>
          <span className="text-xs bg-white/80 text-black px-2 py-1 rounded-full font-medium">
            Active
          </span>
        </div>

        <p className="text-4xl font-bold mb-2">${balance.toFixed(2)}</p>

        <div className="mt-4 text-sm text-gray-200 tracking-wider">
          <p className="font-mono text-lg">{cardNumber}</p>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <p className="text-base font-medium">{userName}</p>
        </div>
      </div>
    </div>
  );
}
