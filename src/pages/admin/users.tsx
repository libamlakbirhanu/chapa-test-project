// Update src/pages/admin/users.tsx
import { useState } from "react";
import { fetchUsers, toggleUserStatus } from "@/api";
import BasicTable from "@/components/shared/basic-table";
import { Switch } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ConfirmationModal } from "@/components/confirmation-modal";
import toast from "react-hot-toast";
import { User } from "@/types";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: users,
    isLoading: usersLoading,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      await toggleUserStatus(userId);
    },
    onSuccess: () => {
      refetch();
      toast.success("User status updated successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user status");
      setIsModalOpen(false);
    },
  });

  const handleStatusChange = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmStatusChange = () => {
    if (selectedUser) {
      toggleStatusMutation.mutate({
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
      accessorKey: "balance",
      header: "Current Balance",
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
          <Switch
            checked={row.original.active}
            onChange={() => handleStatusChange(row.original)}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-[#78C306] data-focus:outline data-focus:outline-white"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
            />
          </Switch>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BasicTable
        columns={columns}
        data={users || []}
        title="Users"
        loading={usersLoading}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmStatusChange}
        title="Confirm Status Change"
        description={`Are you sure you want to ${
          selectedUser?.active ? "deactivate" : "activate"
        } ${selectedUser?.username || "this user"}?`}
        confirmText={selectedUser?.active ? "Deactivate" : "Activate"}
        loading={toggleStatusMutation.isPending}
      />
    </div>
  );
};

export default Users;
