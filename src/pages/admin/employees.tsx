// Update src/pages/admin/users.tsx
import { useState } from "react";
import { fetchCompanyUsers, removeEmployee } from "@/api";
import BasicTable from "@/components/shared/basic-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ConfirmationModal } from "@/components/confirmation-modal";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/auth-context";
import { Button } from "@headlessui/react";
import EmployeeModal from "@/components/employee-modal";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  active: boolean;
  balance: number;
}

const Employees = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const {
    data: users,
    isLoading: usersLoading,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["employees"],
    queryFn: () => fetchCompanyUsers(user?.email || ""),
  });

  const removeEmployeeMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      await removeEmployee(userId);
    },
    onSuccess: () => {
      refetch();
      toast.success("Employee removed successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove employee");
      setIsModalOpen(false);
    },
  });

  const handleUserRemove = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmStatusChange = () => {
    if (selectedUser) {
      removeEmployeeMutation.mutate({
        userId: selectedUser.email,
      });
    }
  };

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }: { row: { original: User } }) => (
        <div className="flex items-center gap-2">
          {row.original.active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }: { row: { original: User } }) => (
        <div className="flex items-center gap-2">
          <TrashIcon
            className="text-red-500 w-8 h-8 hover:scale-105 transition-all cursor-pointer"
            onClick={() => handleUserRemove(row.original)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Users</h1>
        <Button
          onClick={() => setIsAddEmployeeModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#78C306] px-4 py-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-[#78C306]/80 data-open:bg-gray-700 cursor-pointer"
        >
          Add Admin User
        </Button>
      </div>

      <EmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />

      <BasicTable columns={columns} data={users || []} loading={usersLoading} />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmStatusChange}
        title="Confirm Employee Removal"
        description={`Are you sure you want to remove ${
          selectedUser?.username || "this employee"
        }?`}
        confirmText={"Delete"}
        loading={removeEmployeeMutation.isPending}
      />
    </div>
  );
};

export default Employees;
