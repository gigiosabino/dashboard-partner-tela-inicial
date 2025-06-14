
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricsCards } from "./MetricsCards";
import { ChartsSection } from "./ChartsSection";
import { RecentPendencies } from "./RecentPendencies";
import { PeriodFilter } from "./PeriodFilter";
import { ExternalLink, Search, User, Clock } from "lucide-react";
import { useState } from "react";

export function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months");
  const [dateRange, setDateRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    if (period !== "custom") {
      setDateRange(null);
    }
  };

  const handleDateRangeChange = (range: any) => {
    setDateRange(range);
  };

  const handleDocsClick = () => {
    window.open("https://bmpdocs.moneyp.com.br/caas/sobre-o-caas", "_blank");
  };

  // Função para calcular tempo restante da sessão (exemplo: 30 minutos)
  const getSessionTimeRemaining = () => {
    const now = new Date();
    const sessionEnd = new Date(now.getTime() + 30 * 60000); // 30 minutos
    const remaining = Math.floor((sessionEnd.getTime() - now.getTime()) / 60000);
    return `${remaining}min`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          
          {/* Campo de busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Tempo restante da sessão */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{getSessionTimeRemaining()}</span>
            </div>

            {/* Perfil do usuário */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>Usuário Admin</span>
            </div>

            {/* Botão Docs */}
            <Button 
              onClick={handleDocsClick}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <ExternalLink className="h-4 w-4" />
              Docs
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <PeriodFilter 
            onPeriodChange={handlePeriodChange}
            onDateRangeChange={handleDateRangeChange}
            selectedPeriod={selectedPeriod}
          />
        </div>
        
        <MetricsCards selectedPeriod={selectedPeriod} />
        <ChartsSection selectedPeriod={selectedPeriod} />
        <RecentPendencies selectedPeriod={selectedPeriod} />
      </main>
    </div>
  );
}
