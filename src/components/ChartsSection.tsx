
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartsSectionProps {
  selectedPeriod: string;
}

const statusData = [
  { name: "Paga", value: 256, color: "#10B981" },
  { name: "Aprovada", value: 234, color: "#3B82F6" },
  { name: "Finalizada", value: 189, color: "#059669" },
  { name: "Liberada", value: 167, color: "#6366F1" },
  { name: "Cedida", value: 156, color: "#8B5CF6" },
  { name: "Em análise", value: 145, color: "#F59E0B" },
  { name: "Pendente", value: 123, color: "#F97316" },
  { name: "Pendente pagamento", value: 89, color: "#EF4444" },
  { name: "Conferida", value: 78, color: "#14B8A6" },
  { name: "Recusada", value: 67, color: "#DC2626" },
  { name: "Cancelada", value: 45, color: "#6B7280" },
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
          <BarChart
            data={currentData}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={75}
              fontSize={11}
            />
            <Tooltip 
              formatter={(value) => [value, "Propostas"]}
              labelStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
