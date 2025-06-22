

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  ArrowRightLeft,
  FileCheck,
  Unlock,
  Clock,
  DollarSign,
  ThumbsUp,
  TrendingUp,
  Percent,
  Download,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV, generateMockData } from "@/utils/csvExport";

interface MetricsCardsProps {
  selectedPeriod: string;
}

export function MetricsCards({ selectedPeriod }: MetricsCardsProps) {
  const handleExportCSV = (status: string, title: string) => {
    const data = generateMockData(status, selectedPeriod);
    const headers = ['id', 'cliente', 'valor', 'status', 'data', 'taxa'];
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${selectedPeriod}.csv`;
    exportToCSV(data, filename, headers);
  };

  const metrics = [
    // Linha 1
    {
      title: "Clientes cadastrados",
      value: "2,156",
      subtitle: "total de clientes ativos",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      exportable: false,
    },
    {
      title: "Propostas criadas",
      value: "1,234",
      subtitle: "no período selecionado",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      exportable: true,
      status: "criadas",
    },
    {
      title: "Valor total financiado",
      value: "R$ 12.456.789",
      subtitle: "no período selecionado",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      exportable: false,
    },
    {
      title: "Propostas aprovadas",
      value: "987",
      subtitle: "no período selecionado",
      icon: ThumbsUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      exportable: true,
      status: "aprovadas",
    },
    // Linha 2
    {
      title: "Propostas finalizadas",
      value: "789",
      subtitle: "no período selecionado",
      icon: FileCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      exportable: true,
      status: "finalizadas",
    },
    {
      title: "Propostas liberadas",
      value: "567",
      subtitle: "no período selecionado",
      icon: Unlock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      exportable: true,
      status: "liberadas",
    },
    {
      title: "Ticket médio",
      value: "R$ 10.089",
      subtitle: "valor médio por proposta",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      exportable: false,
    },
    {
      title: "Taxa média de juros",
      value: "3,45%",
      subtitle: "taxa média cobrada",
      icon: Percent,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      exportable: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {metric.exportable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportCSV(metric.status!, metric.title)}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <Download className="w-3 h-3 text-gray-500" />
                </Button>
              )}
              <div className={`p-2 rounded-md ${metric.bgColor}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <p className="text-xs text-gray-500">
              {metric.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

