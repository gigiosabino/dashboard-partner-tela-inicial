
import { useState } from "react";
import { MetricsCards } from "@/components/MetricsCards";
import { ChartsSection } from "@/components/ChartsSection";
import { RecentPendencies } from "@/components/RecentPendencies";
import { PeriodFilter } from "@/components/PeriodFilter";
import { FinancedValueChart } from "@/components/FinancedValueChart";
import { MonthlyContractsChart } from "@/components/MonthlyContractsChart";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Dashboard de parceiros" 
        subtitle="Visualize as principais métricas e indicadores do seu negócio"
      />

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
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
          {/* Primeira linha - Propostas x Status e Pendências com mesma altura */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
            <div className="h-[500px]">
              <ChartsSection key={`charts-${refreshKey}`} selectedPeriod={selectedPeriod} />
            </div>
            <div className="h-[500px]">
              <RecentPendencies key={`pendencies-${refreshKey}`} />
            </div>
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
