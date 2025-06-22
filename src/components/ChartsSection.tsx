
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
      // Navegar para a página de propostas com o filtro aplicado via query parameter
      navigate(`/propostas?status=${status}&filtered=true`);
    }
  };

  const currentData = getDataByPeriod();

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-white to-gray-50 border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 text-center">
          Monitoramento de Propostas por Status
        </CardTitle>
        <p className="text-sm text-gray-500 text-center">Clique em uma fatia para filtrar as propostas</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center">
        <div className="w-full h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                stroke="white"
                strokeWidth={3}
                onClick={handleSliceClick}
                style={{ cursor: 'pointer' }}
              >
                {currentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any) => [value, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="flex flex-wrap justify-center gap-4">
          {currentData.map((entry, index) => (
            <div 
              key={`legend-${index}`}
              onClick={() => handleSliceClick(entry)}
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white px-3 py-2 rounded-lg shadow-sm border"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.name}
              </span>
              <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
