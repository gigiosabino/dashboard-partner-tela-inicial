
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface MonthlyContractsChartProps {
  selectedPeriod: string;
}

const dataByYear = {
  "2024": [
    { month: "Jan", propostas: 120 },
    { month: "Fev", propostas: 190 },
    { month: "Mar", propostas: 150 },
    { month: "Abr", propostas: 280 },
    { month: "Mai", propostas: 320 },
    { month: "Jun", propostas: 290 },
    { month: "Jul", propostas: 340 },
    { month: "Ago", propostas: 310 },
    { month: "Set", propostas: 380 },
    { month: "Out", propostas: 420 },
    { month: "Nov", propostas: 360 },
    { month: "Dez", propostas: 450 },
  ],
  "2023": [
    { month: "Jan", propostas: 100 },
    { month: "Fev", propostas: 160 },
    { month: "Mar", propostas: 130 },
    { month: "Abr", propostas: 240 },
    { month: "Mai", propostas: 280 },
    { month: "Jun", propostas: 250 },
    { month: "Jul", propostas: 300 },
    { month: "Ago", propostas: 270 },
    { month: "Set", propostas: 320 },
    { month: "Out", propostas: 350 },
    { month: "Nov", propostas: 310 },
    { month: "Dez", propostas: 380 },
  ],
  "2022": [
    { month: "Jan", propostas: 80 },
    { month: "Fev", propostas: 120 },
    { month: "Mar", propostas: 100 },
    { month: "Abr", propostas: 180 },
    { month: "Mai", propostas: 220 },
    { month: "Jun", propostas: 200 },
    { month: "Jul", propostas: 250 },
    { month: "Ago", propostas: 230 },
    { month: "Set", propostas: 280 },
    { month: "Out", propostas: 300 },
    { month: "Nov", propostas: 260 },
    { month: "Dez", propostas: 320 },
  ],
};

export function MonthlyContractsChart({ selectedPeriod }: MonthlyContractsChartProps) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const getDataByYear = () => {
    console.log("Período selecionado para contratações:", selectedPeriod);
    console.log("Ano selecionado:", selectedYear);
    return dataByYear[selectedYear as keyof typeof dataByYear] || dataByYear["2024"];
  };

  const currentData = getDataByYear();

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Contratações mensais
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
