
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartsSectionProps {
  selectedPeriod: string;
}

const statusData = [
  { name: "Em análise", value: 145, color: "#F59E0B" },
  { name: "Aprovada", value: 234, color: "#3B82F6" },
  { name: "Finalizada", value: 189, color: "#059669" },
  { name: "Liberada", value: 167, color: "#6366F1" },
  { name: "Cedida", value: 156, color: "#8B5CF6" },
  { name: "Paga", value: 256, color: "#10B981" },
  { name: "Pendente pagamento", value: 89, color: "#EF4444" },
  { name: "Cancelada", value: 45, color: "#6B7280" },
  { name: "Conferida", value: 78, color: "#14B8A6" },
  { name: "Pendente", value: 123, color: "#F97316" },
  { name: "Recusada", value: 67, color: "#DC2626" },
];

export function ChartsSection({ selectedPeriod }: ChartsSectionProps) {
  const getDataByPeriod = () => {
    console.log("Período selecionado:", selectedPeriod);
    return statusData;
  };

  const currentData = getDataByPeriod();

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Propostas x Status
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              fontSize={10}
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Propostas"]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
