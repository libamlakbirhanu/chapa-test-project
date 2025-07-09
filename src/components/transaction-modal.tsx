import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { sendTransaction } from "@/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  amount: string;
  to: string;
};

const schema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .max(100000, "Amount is too large"),
  to: z.string().min(1, "Recipient is required"),
});

export default function TransactionModal({ isOpen, onClose }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: sendTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      reset();
      onClose();
      toast.success("Transaction sent successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send transaction");
      onClose();
    },
  });

  useEffect(() => {
    reset();
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    mutation.mutate({ ...data, userId: user?.email || "" });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl w-full max-w-sm text-white shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Send Money</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Recipient</label>
            <input
              type="text"
              {...register("to")}
              className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
              placeholder="e.g. Alice"
            />
            {errors.to && (
              <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm block mb-1">Amount</label>
            <input
              type="number"
              {...register("amount")}
              className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
              placeholder="$0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium disabled:opacity-50"
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
