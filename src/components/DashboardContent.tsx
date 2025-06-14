
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MetricsCards } from "./MetricsCards";
import { ChartsSection } from "./ChartsSection";
import { RecentPendencies } from "./RecentPendencies";
import { PeriodFilter } from "./PeriodFilter";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months");
  const [dateRange, setDateRange] = useState(null);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <Button 
            onClick={handleDocsClick}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <ExternalLink className="h-4 w-4" />
            Docs
          </Button>
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
