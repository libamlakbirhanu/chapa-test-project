import { useQuery } from "@tanstack/react-query";
import { fetchPaymentSummaries, PaymentSummaryType } from "@/api";
import Skeleton from "@/components/ui/wallet-skeleton-loader";
import Chart from "react-apexcharts";

const PaymentSummary = () => {
  const {
    data: summaries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payment-summaries"],
    queryFn: fetchPaymentSummaries,
  });

  if (isPending) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load payment summaries</div>
      </div>
    );
  }

  // Prepare chart data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartOptions: any = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#9CA3AF",
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
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
      categories: summaries?.map((s) => s.username) || [],
      labels: {
        style: {
          colors: "#9CA3AF",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9CA3AF",
        },
        formatter: (val: number) => `$${val}`,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#9CA3AF",
      },
    },
    grid: {
      borderColor: "#4B5563",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `$${val.toFixed(2)}`,
      },
    },
    colors: ["#EF4444", "#10B981"],
  };

  const chartSeries = [
    {
      name: "Total Sent",
      data: summaries?.map((s) => s.totalSent) || [],
    },
    {
      name: "Total Received",
      data: summaries?.map((s) => s.totalReceived) || [],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Payment Summary</h1>

      <div className="bg-gray-800/50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Transaction Overview
        </h2>
        <div className="h-[400px]">
          {typeof window !== "undefined" && (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height="100%"
            />
          )}
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Transaction Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Sent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Received
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Transactions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {summaries?.map((summary: PaymentSummaryType) => (
                <tr key={summary.userId} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {summary.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 text-right">
                    -${summary.totalSent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 text-right">
                    +${summary.totalReceived.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                    {summary.transactionCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
