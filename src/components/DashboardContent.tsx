
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search, Clock, User } from "lucide-react";
import { MetricsCards } from "@/components/MetricsCards";
import { ChartsSection } from "@/components/ChartsSection";

export function DashboardContent() {
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
            
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">PERFIL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard de Parceiros</h1>
          <p className="text-gray-600">Visualize as principais métricas e indicadores do seu negócio</p>
        </div>

        <MetricsCards />
        <ChartsSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 mt-auto">
        <p className="text-sm text-gray-500">© 2025</p>
      </footer>
    </div>
  );
}
