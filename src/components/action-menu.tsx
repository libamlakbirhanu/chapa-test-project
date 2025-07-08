// src/components/ActionMenu.tsx
import {
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

export default function ActionMenu({ onSend }: { onSend: () => void }) {
  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto">
      <div className="flex gap-6 md:gap-10 justify-start md:justify-center">
        <div
          className="flex flex-col items-center min-w-[60px] cursor-pointer"
          onClick={onSend}
        >
          <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition">
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs mt-2 text-gray-300">Send</span>
        </div>
        <div className="flex flex-col items-center min-w-[60px]">
          <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition">
            <ArrowDownTrayIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs mt-2 text-gray-300">Receive</span>
        </div>
      </div>
    </div>
  );
}
