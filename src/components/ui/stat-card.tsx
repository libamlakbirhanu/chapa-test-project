interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}

export default StatCard;
