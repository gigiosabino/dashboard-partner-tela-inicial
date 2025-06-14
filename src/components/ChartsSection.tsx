
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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
    <Card className="h-[400px] hover:shadow-lg transition-shadow duration-200">
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
              cx="65%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [value, "Propostas"]}
              labelStyle={{ fontSize: '12px' }}
            />
            <Legend 
              verticalAlign="middle" 
              align="left"
              layout="vertical"
              iconSize={8}
              wrapperStyle={{
                paddingRight: '20px',
                fontSize: '11px',
                lineHeight: '14px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
