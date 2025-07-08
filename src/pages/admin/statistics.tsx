import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import {
  fetchSystemStats,
  fetchPaymentSummaries,
  PaymentSummaryType,
} from "@/api";
import BasicTable from "@/components/shared/basic-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils";
import WalletSkeletonLoader from "@/components/ui/wallet-skeleton-loader";
import StatCard from "@/components/ui/stat-card";

export default function Statistics() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["system-stats"],
    queryFn: fetchSystemStats,
  });

  const { data: paymentSummaries, isLoading: isLoadingSummaries } = useQuery({
    queryKey: ["payment-summaries"],
    queryFn: fetchPaymentSummaries,
  });

  // Chart options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartOptions: any = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
      background: "#1F2937",
      foreColor: "#9CA3AF",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: paymentSummaries?.map((summary) => summary.username) || [],
      labels: {
        style: {
          colors: "#9CA3AF",
        },
      },
    },
    yaxis: {
      title: {
        text: "Amount (ETB)",
        style: {
          color: "#9CA3AF",
        },
      },
      labels: {
        style: {
          colors: "#9CA3AF",
        },
        formatter: (value: number) => formatCurrency(value, 0),
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => formatCurrency(val),
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#9CA3AF",
      },
    },
    colors: ["#EF4444", "#10B981"],
  };

  const chartSeries = [
    {
      name: "Sent",
      data: paymentSummaries?.map((summary) => summary.totalSent) || [],
    },
    {
      name: "Received",
      data: paymentSummaries?.map((summary) => summary.totalReceived) || [],
    },
  ];

  // Table columns
  const columns: ColumnDef<PaymentSummaryType>[] = [
    {
      accessorKey: "username",
      header: "User",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.username}</div>
      ),
    },
    {
      accessorKey: "totalSent",
      header: "Total Sent",
      cell: ({ row }) => (
        <div className="text-red-400">
          {formatCurrency(row.original.totalSent)}
        </div>
      ),
    },
    {
      accessorKey: "totalReceived",
      header: "Total Received",
      cell: ({ row }) => (
        <div className="text-green-400">
          {formatCurrency(row.original.totalReceived)}
        </div>
      ),
    },
    {
      accessorKey: "transactionCount",
      header: "Transactions",
      cell: ({ row }) => <div>{row.original.transactionCount}</div>,
    },
  ];

  if (isLoadingStats) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <WalletSkeletonLoader key={i} />
          ))}
        </div>
        <WalletSkeletonLoader />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">System Statistics</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Payments"
          value={formatCurrency(stats?.totalPayments || 0)}
          description="Total value of all transactions"
        />
        <StatCard
          title="Active Users"
          value={stats?.activeUsers || 0}
          description="Currently active users"
        />
        <StatCard
          title="Admin Users"
          value={stats?.admins || 0}
          description="Total admin users"
        />
      </div>

      {/* Chart */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Payment Overview</h2>
        </div>
        <div className="p-4 h-[400px]">
          {isLoadingSummaries ? (
            <div className="h-full w-full bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height="100%"
            />
          )}
        </div>
      </div>

      {/* Payment Summary Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            Payment Summary by User
          </h2>
        </div>
        <div className="p-4">
          <BasicTable
            columns={columns}
            data={paymentSummaries || []}
            loading={isLoadingSummaries}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
