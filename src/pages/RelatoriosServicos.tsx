
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RelatoriosServicosContent } from "@/components/RelatoriosServicosContent";
import { GlobalHeader } from "@/components/GlobalHeader";

const RelatoriosServicos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader 
            title="Relatórios" 
            subtitle="Relatórios de Serviços Integrados" 
          />
          <RelatoriosServicosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RelatoriosServicos;
