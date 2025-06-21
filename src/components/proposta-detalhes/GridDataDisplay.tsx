
interface GridDataDisplayProps {
  data: Record<string, string | number>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 2 }: GridDataDisplayProps) {
  const gridCols = columns === 1 ? 'grid-cols-1' : columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';
  
  return (
    <div className={`grid ${gridCols} gap-4`}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <label className="text-sm font-medium text-gray-600 block mb-1">{key}</label>
          <p className="text-gray-900 font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}
