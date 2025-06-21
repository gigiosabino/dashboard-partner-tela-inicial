
interface GridDataDisplayProps {
  data: Record<string, string | number>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 3 }: GridDataDisplayProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';
  
  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <label className="text-sm font-medium text-slate-600">{key}</label>
          <p className="text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
