
interface GridDataDisplayProps {
  data: Record<string, string | number>;
  columns?: number;
}

export function GridDataDisplay({ data, columns = 3 }: GridDataDisplayProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';
  
  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md">
          <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{key}</label>
          <p className="text-slate-900 font-medium mt-2 text-lg">{value}</p>
        </div>
      ))}
    </div>
  );
}
