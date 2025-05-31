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

const monthlyData = [
  { month: "Jan", propostas: 120, valor: 2400000 },
  { month: "Fev", propostas: 190, valor: 3200000 },
  { month: "Mar", propostas: 150, valor: 2800000 },
  { month: "Abr", propostas: 280, valor: 4500000 },
  { month: "Mai", propostas: 320, valor: 5200000 },
  { month: "Jun", propostas: 290, valor: 4800000 },
];

const statusData = [
  { name: "Em analise", value: 145, color: "#F59E0B" },
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

const weeklyData = [
  { day: "Seg", propostas: 45 },
  { day: "Ter", propostas: 52 },
  { day: "Qua", propostas: 38 },
  { day: "Qui", propostas: 67 },
  { day: "Sex", propostas: 71 },
  { day: "Sab", propostas: 23 },
  { day: "Dom", propostas: 18 },
];

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Evolução Mensal */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Evolução Mensal de Propostas e Valor Financiado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === "propostas" ? value : `R$ ${value.toLocaleString()}`,
                  name === "propostas" ? "Propostas" : "Valor Financiado"
                ]}
              />
              <Bar yAxisId="left" dataKey="propostas" fill="#3B82F6" name="propostas" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="valor"
                stroke="#10B981"
                strokeWidth={3}
                name="valor"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status das Propostas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
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

      {/* Propostas por Dia da Semana */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Propostas por Dia da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Propostas"]} />
              <Bar dataKey="propostas" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
