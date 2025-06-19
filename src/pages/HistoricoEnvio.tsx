
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { HistoricoEnvioContent } from "@/components/HistoricoEnvioContent";
import { GlobalHeader } from "@/components/GlobalHeader";

const HistoricoEnvio = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader 
            title="Histórico de Envio" 
            subtitle="Acompanhe o histórico de callbacks enviados" 
          />
          <HistoricoEnvioContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HistoricoEnvio;
