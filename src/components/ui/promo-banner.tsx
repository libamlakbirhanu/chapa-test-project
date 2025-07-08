import { UserPlusIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PromoBanner() {
  return (
    <div className="flex-1 bg-gradient-to-r from-[#78C306]/40 via-green-600/40 to-{#78C306}/30 backdrop-blur-md border border-white/10 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 space-y-3">
        <h3 className="text-2xl font-bold">
          Refer Your Friends & Earn Rewards
        </h3>
        <p className="text-sm text-gray-300 max-w-md">
          Get paid for every friend who joins Chapa through your link. It's
          easy, instant, and unlimited!
        </p>

        <ul className="text-sm space-y-1 text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-green-400" />
            Instant payout to your wallet
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-green-400" />
            No referral limits
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 self-center">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-sm font-semibold px-5 py-2 rounded-lg shadow">
          <UserPlusIcon className="w-5 h-5" />
          Generate Referral Link
        </button>
      </div>
    </div>
  );
}
