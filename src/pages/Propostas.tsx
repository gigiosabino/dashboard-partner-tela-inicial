
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PropostasContent } from "@/components/PropostasContent";
import { GlobalHeader } from "@/components/GlobalHeader";

const Propostas = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader 
            title="Propostas" 
            subtitle="Gestão de propostas contratadas" 
          />
          <PropostasContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Propostas;
