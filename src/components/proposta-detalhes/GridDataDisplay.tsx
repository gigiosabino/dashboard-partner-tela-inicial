
interface GridDataDisplayProps {
  data: Record<string, string | number>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 1 }: GridDataDisplayProps) {
  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{key}</label>
          <p className="text-gray-900 font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}
