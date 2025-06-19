
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MensageriaContent } from "@/components/MensageriaContent";
import { GlobalHeader } from "@/components/GlobalHeader";

const Mensageria = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader 
            title="Mensageria" 
            subtitle="Gerencie números bloqueados para mensagens" 
          />
          <MensageriaContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Mensageria;
