
interface GridDataDisplayProps {
  data: Record<string, string>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 2 }: GridDataDisplayProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            {key}
          </label>
          <p className="text-gray-900 font-normal">{value}</p>
        </div>
      ))}
    </div>
  );
}
