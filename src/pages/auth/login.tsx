import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/api";

export type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: userLogin,
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        const role = data.role as "user" | "admin" | "super-admin";
        login({ role, email: data.email, username: data.username });

        if (role === "user") navigate("/dashboard");
        if (role === "admin") navigate("/admin/users");
        if (role === "super-admin") navigate("/admin/users");

        toast.success("Login successful");
        sessionStorage.setItem("user", data?.email);
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#78C306]/10 via-transparent to-transparent animate-[spin_20s_linear_infinite]" />
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5A9E03]/10 via-transparent to-transparent animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 shadow-2xl rounded-2xl p-8 w-full space-y-6 text-white relative z-10 transform transition-all duration-300 hover:shadow-[#78C306]/20 hover:shadow-lg">
          {/* Logo and header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-gray-300">
              Sign in to your Chapa account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email")}
                  className="block w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-700/50 border border-gray-600/50 focus:ring-2 focus:ring-[#78C306]/50 focus:border-transparent placeholder-gray-400 text-white transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className="block w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-700/50 border border-gray-600/50 focus:ring-2 focus:ring-[#78C306]/50 focus:border-transparent placeholder-gray-400 text-white transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-[#78C306] text-white hover:bg-[#9be322] hover:shadow-lg hover:shadow-[#78C306]/20 focus:outline-none focus:ring-2 focus:ring-[#78C306] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            {mutation.isError && (
              <div className="mt-2 p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
                <p className="text-red-300 text-sm text-center">
                  Invalid email or password. Please try again.
                </p>
              </div>
            )}
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-700/50 text-gray-300 text-sm">
                Test accounts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div
              className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-[#78C306]/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() =>
                reset({ email: "admin@chapa.com", password: "password" })
              }
            >
              <div className="font-medium text-white">Admin</div>
              <div className="text-gray-300 text-xs truncate">
                admin@chapa.com
              </div>
            </div>
            <div
              className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-[#78C306]/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() =>
                reset({ email: "superadmin@chapa.com", password: "password" })
              }
            >
              <div className="font-medium text-white">Super Admin</div>
              <div className="text-gray-300 text-xs truncate">
                superadmin@chapa.com
              </div>
            </div>
            <div
              className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-[#78C306]/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() =>
                reset({ email: "libamlak@chapa.com", password: "password" })
              }
            >
              <div className="font-medium text-white">Libamlak</div>
              <div className="text-gray-300 text-xs truncate">
                libamlak@chapa.com
              </div>
            </div>
            <div
              className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-[#78C306]/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() =>
                reset({ email: "test@chapa.com", password: "password" })
              }
            >
              <div className="font-medium text-white">Test</div>
              <div className="text-gray-300 text-xs truncate">
                test@chapa.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
