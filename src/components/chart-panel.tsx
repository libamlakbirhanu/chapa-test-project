import ReactApexChart from "react-apexcharts";

const ChartPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartOptions: any = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#ccc",
    },
    colors: ["#34d399"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    grid: {
      borderColor: "#333",
      row: { colors: ["transparent"], opacity: 0.5 },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartSeries = [
    {
      name: "Expenses",
      data: [420, 380, 600, 510, 660, 490, 720],
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-md w-full max-w-3xl">
      <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={250}
      />
    </div>
  );
};

export default ChartPanel;
