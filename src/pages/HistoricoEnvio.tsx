
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { HistoricoEnvioContent } from "@/components/HistoricoEnvioContent";

const HistoricoEnvio = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <HistoricoEnvioContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HistoricoEnvio;
