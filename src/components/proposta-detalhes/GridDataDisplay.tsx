

interface GridDataDisplayProps {
  data: Record<string, string | number>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 1 }: GridDataDisplayProps) {
  const gridClass = columns > 1 ? `grid grid-cols-${columns} gap-6` : 'space-y-3';
  
  return (
    <div className={gridClass}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">{key}</label>
          <p className="text-gray-900 font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}

