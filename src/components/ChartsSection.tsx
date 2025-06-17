
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
  { name: "Em Análise", code: "1", value: 145, color: "#F59E0B" },
  { name: "Aprovada", code: "2", value: 234, color: "#3B82F6" },
  { name: "Recusada", code: "3", value: 67, color: "#DC2626" },
  { name: "Cancelada", code: "4", value: 45, color: "#6B7280" },
  { name: "Pendente", code: "5", value: 123, color: "#F97316" },
  { name: "Finalizada", code: "6", value: 189, color: "#059669" },
  { name: "Conferida", code: "7", value: 78, color: "#14B8A6" },
  { name: "Liberada", code: "8", value: 167, color: "#6366F1" },
  { name: "Paga", code: "9", value: 256, color: "#10B981" },
  { name: "Cedida", code: "10", value: 156, color: "#8B5CF6" },
  { name: "Pendente Pagamento", code: "11", value: 89, color: "#EF4444" },
];

export function ChartsSection({ selectedPeriod }: ChartsSectionProps) {
  const getDataByPeriod = () => {
    console.log("Período selecionado:", selectedPeriod);
    return statusData;
  };

  const currentData = getDataByPeriod();

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Monitoramento de propostas por status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="code" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value, name, props) => [
                value, 
                `${props.payload.name} (${props.payload.code})`
              ]}
              labelFormatter={(code) => {
                const item = currentData.find(d => d.code === code);
                return item ? `${item.name} (${code})` : code;
              }}
            />
            <Bar 
              dataKey="value" 
              fill={(entry) => entry.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
