
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Play, Settings, FileText } from "lucide-react";
import { GeradorRapidoTab } from "@/components/relatorios/GeradorRapidoTab";
import { ConfigurarRelatorioTab } from "@/components/relatorios/ConfigurarRelatorioTab";
import { HistoricoRelatoriosTab } from "@/components/relatorios/HistoricoRelatoriosTab";

export function RelatoriosCaasContent() {
  const [activeTab, setActiveTab] = useState("gerador");

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader 
        title="Relatórios CAAS" 
        subtitle="Central de Análise e Acompanhamento de Sistemas" 
      />

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="gerador" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <Play className="w-4 h-4" />
              <span className="font-medium">Gerador Rápido</span>
            </TabsTrigger>
            <TabsTrigger 
              value="configurar" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Configurar Relatórios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="historico" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Histórico</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gerador">
            <GeradorRapidoTab />
          </TabsContent>

          <TabsContent value="configurar">
            <ConfigurarRelatorioTab />
          </TabsContent>

          <TabsContent value="historico">
            <HistoricoRelatoriosTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
