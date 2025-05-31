
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  ArrowRightLeft,
  FileCheck,
  Unlock,
  Clock,
  DollarSign,
  Percent,
  Users,
} from "lucide-react";

const metrics = [
  {
    title: "Propostas Criadas",
    value: "1,234",
    subtitle: "no mês vigente",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Propostas Pagas",
    value: "856",
    subtitle: "no mês vigente",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Propostas Cedidas",
    value: "423",
    subtitle: "no mês vigente",
    icon: ArrowRightLeft,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Propostas Finalizadas",
    value: "789",
    subtitle: "no mês vigente",
    icon: FileCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Propostas Liberadas",
    value: "567",
    subtitle: "no mês vigente",
    icon: Unlock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Pendente Pagamento",
    value: "89",
    subtitle: "tempo real",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Valor Total Financiado",
    value: "R$ 12.456.789",
    subtitle: "no mês vigente",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "FEE BMP",
    value: "R$ 245.678",
    subtitle: "valor calculado",
    icon: Percent,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Clientes Cadastrados",
    value: "456",
    subtitle: "no mês vigente",
    icon: Users,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-md ${metric.bgColor}`}>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
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
