
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, User, RefreshCw, ChevronDown } from "lucide-react";
import { MetricsCards } from "@/components/MetricsCards";
import { ChartsSection } from "@/components/ChartsSection";
import { RecentPendencies } from "@/components/RecentPendencies";
import { PeriodFilter } from "@/components/PeriodFilter";
import { FinancedValueChart } from "@/components/FinancedValueChart";
import { MonthlyContractsChart } from "@/components/MonthlyContractsChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-6-months");
  const [customDateRange, setCustomDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setCustomDateRange({ startDate, endDate });
    console.log("Data range changed:", startDate, endDate);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Atualizando dashboard...");
    
    // Simula um delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Força a re-renderização de todos os componentes filhos
    setRefreshKey(prev => prev + 1);
    setIsRefreshing(false);
    
    console.log("Dashboard atualizado!");
  };

  const handleAlterarSenha = () => {
    console.log("Alterar senha clicado");
  };

  const handleAlterarEmpresa = () => {
    console.log("Alterar empresa clicado");
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search" 
                className="pl-10 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>59:51</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">PERFIL</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem onClick={handleAlterarSenha}>
                  Alterar senha
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAlterarEmpresa}>
                  Alterar empresa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard de parceiros</h1>
              <p className="text-gray-600">Visualize as principais métricas e indicadores do seu negócio</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
            </Button>
          </div>
          <PeriodFilter 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={setSelectedPeriod}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>

        <MetricsCards key={`metrics-${refreshKey}`} selectedPeriod={selectedPeriod} />
        
        <div className="space-y-6">
          {/* Primeira linha - Propostas x Status e Pendências */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartsSection key={`charts-${refreshKey}`} selectedPeriod={selectedPeriod} />
            <RecentPendencies key={`pendencies-${refreshKey}`} selectedPeriod={selectedPeriod} />
          </div>
          
          {/* Segunda linha - Valor financiado mensal e Contratações mensais */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FinancedValueChart key={`financed-${refreshKey}`} selectedPeriod={selectedPeriod} />
            <MonthlyContractsChart key={`contracts-${refreshKey}`} selectedPeriod={selectedPeriod} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 mt-auto">
        <p className="text-sm text-gray-500">© 2025</p>
      </footer>
    </div>
  );
}
