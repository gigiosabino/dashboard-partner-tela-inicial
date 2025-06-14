
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface FinancedValueChartProps {
  selectedPeriod: string;
}

const dataByYear = {
  "2024": [
    { month: "Jan", valor: 2400000 },
    { month: "Fev", valor: 3200000 },
    { month: "Mar", valor: 2800000 },
    { month: "Abr", valor: 4500000 },
    { month: "Mai", valor: 5200000 },
    { month: "Jun", valor: 4800000 },
    { month: "Jul", valor: 5600000 },
    { month: "Ago", valor: 4900000 },
    { month: "Set", valor: 5800000 },
    { month: "Out", valor: 6200000 },
    { month: "Nov", valor: 5400000 },
    { month: "Dez", valor: 6800000 },
  ],
  "2023": [
    { month: "Jan", valor: 2100000 },
    { month: "Fev", valor: 2800000 },
    { month: "Mar", valor: 2500000 },
    { month: "Abr", valor: 3900000 },
    { month: "Mai", valor: 4500000 },
    { month: "Jun", valor: 4200000 },
    { month: "Jul", valor: 4800000 },
    { month: "Ago", valor: 4300000 },
    { month: "Set", valor: 5100000 },
    { month: "Out", valor: 5400000 },
    { month: "Nov", valor: 4700000 },
    { month: "Dez", valor: 5900000 },
  ],
  "2022": [
    { month: "Jan", valor: 1800000 },
    { month: "Fev", valor: 2200000 },
    { month: "Mar", valor: 2000000 },
    { month: "Abr", valor: 3200000 },
    { month: "Mai", valor: 3800000 },
    { month: "Jun", valor: 3500000 },
    { month: "Jul", valor: 4100000 },
    { month: "Ago", valor: 3600000 },
    { month: "Set", valor: 4300000 },
    { month: "Out", valor: 4600000 },
    { month: "Nov", valor: 4000000 },
    { month: "Dez", valor: 5000000 },
  ],
};

export function FinancedValueChart({ selectedPeriod }: FinancedValueChartProps) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const getDataByYear = () => {
    console.log("Período selecionado para valor financiado:", selectedPeriod);
    console.log("Ano selecionado:", selectedYear);
    return dataByYear[selectedYear as keyof typeof dataByYear] || dataByYear["2024"];
  };

  const currentData = getDataByYear();

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Valor financiado mensal
          </CardTitle>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
