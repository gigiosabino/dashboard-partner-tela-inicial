
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

  // Função personalizada para renderizar a legenda
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="space-y-1 text-xs">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center space-x-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700 truncate">
              {entry.payload.name} ({entry.payload.code})
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="h-[400px] hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Monitoramento de propostas por status
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
              formatter={(value, name, props) => [
                value, 
                `${props.payload.name} (${props.payload.code})`
              ]}
              labelStyle={{ fontSize: '12px' }}
            />
            <Legend 
              content={renderCustomLegend}
              verticalAlign="middle" 
              align="left"
              layout="vertical"
              wrapperStyle={{
                paddingRight: '20px',
                fontSize: '11px',
                lineHeight: '14px',
                width: '180px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
