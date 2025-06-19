
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

interface ChartsSectionProps {
  selectedPeriod: string;
}

const statusData = [
  { name: "Pagas", value: 256, color: "#10B981" },
  { name: "Cedidas", value: 156, color: "#8B5CF6" },
  { name: "Pendente Pagamento", value: 89, color: "#EF4444" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ChartsSection({ selectedPeriod }: ChartsSectionProps) {
  const navigate = useNavigate();

  const getDataByPeriod = () => {
    console.log("Período selecionado:", selectedPeriod);
    return statusData;
  };

  const handleSliceClick = (data: any) => {
    const statusMap: { [key: string]: string } = {
      "Pagas": "paga",
      "Cedidas": "cedida", 
      "Pendente Pagamento": "pendente-pagamento"
    };
    
    const status = statusMap[data.name];
    if (status) {
      navigate(`/propostas?status=${status}`);
    }
  };

  const currentData = getDataByPeriod();
  const total = currentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Monitoramento de propostas por status
        </CardTitle>
        <p className="text-sm text-gray-500">Clique em uma fatia para filtrar as propostas</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              innerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              onClick={handleSliceClick}
              style={{ cursor: 'pointer' }}
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any, name: any) => [value, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: any, entry: any) => (
                <span style={{ color: entry.color, fontWeight: 500, cursor: 'pointer' }}>
                  {value} ({entry.payload.value})
                </span>
              )}
              onClick={handleSliceClick}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Resumo Total */}
        <div className="mt-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-600">Total de propostas</p>
        </div>
      </CardContent>
    </Card>
  );
}
