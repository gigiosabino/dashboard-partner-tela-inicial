import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartsSectionProps {
  selectedPeriod: string;
}

const monthlyData = [
  { month: "Jan", propostas: 120, valor: 2400000 },
  { month: "Fev", propostas: 190, valor: 3200000 },
  { month: "Mar", propostas: 150, valor: 2800000 },
  { month: "Abr", propostas: 280, valor: 4500000 },
  { month: "Mai", propostas: 320, valor: 5200000 },
  { month: "Jun", propostas: 290, valor: 4800000 },
];

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
  // Simular mudança de dados baseado no período selecionado
  const getDataByPeriod = () => {
    console.log("Período selecionado:", selectedPeriod);
    // Aqui você implementaria a lógica para buscar dados baseados no período
    return monthlyData;
  };

  const currentData = getDataByPeriod();

  return (
    <div className="space-y-6">
      {/* Propostas x Status - ocupa 2 colunas completas */}
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
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={10}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Propostas"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Contratações mensais - ocupa 2 colunas */}
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
    </div>
  );
}
