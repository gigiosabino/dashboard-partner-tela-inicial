
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FinancedValueChartProps {
  selectedPeriod: string;
}

const monthlyData = [
  { month: "Jan", valor: 2400000 },
  { month: "Fev", valor: 3200000 },
  { month: "Mar", valor: 2800000 },
  { month: "Abr", valor: 4500000 },
  { month: "Mai", valor: 5200000 },
  { month: "Jun", valor: 4800000 },
];

export function FinancedValueChart({ selectedPeriod }: FinancedValueChartProps) {
  const getDataByPeriod = () => {
    console.log("Período selecionado para valor financiado:", selectedPeriod);
    return monthlyData;
  };

  const currentData = getDataByPeriod();

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Valor financiado mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor financiado"]}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#10B981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
