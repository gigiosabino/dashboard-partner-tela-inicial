
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

interface MonthlyContractsChartProps {
  selectedPeriod: string;
}

const monthlyData = [
  { month: "Jan", propostas: 120 },
  { month: "Fev", propostas: 190 },
  { month: "Mar", propostas: 150 },
  { month: "Abr", propostas: 280 },
  { month: "Mai", propostas: 320 },
  { month: "Jun", propostas: 290 },
];

export function MonthlyContractsChart({ selectedPeriod }: MonthlyContractsChartProps) {
  const getDataByPeriod = () => {
    console.log("Período selecionado para contratações:", selectedPeriod);
    return monthlyData;
  };

  const currentData = getDataByPeriod();

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Contratações mensais
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Propostas"]} />
            <Bar dataKey="propostas" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
