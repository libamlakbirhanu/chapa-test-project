import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addAdminUser } from "@/api";
import toast from "react-hot-toast";

const adminUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "super-admin"]),
});

type AdminUserFormData = z.infer<typeof adminUserSchema>;

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeModal({ isOpen, onClose }: EmployeeModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      role: "admin",
    },
  });

  const mutation = useMutation({
    mutationFn: addAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Admin user added successfully");
      onClose();
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add admin user");
    },
  });

  const onSubmit = (data: AdminUserFormData) => {
    mutation.mutate(data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Add New Admin User
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#78C306] focus:outline-none"
                      placeholder="Enter username"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="Enter email"
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#78C306] focus:outline-none"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="*********"
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#78C306] focus:outline-none"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#78C306] focus:outline-none"
                      {...register("role")}
                    >
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                      disabled={mutation.isPending}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-[#78C306] rounded-md hover:bg-[#6ab205] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#78C306] disabled:opacity-50"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Adding..." : "Add Admin"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
