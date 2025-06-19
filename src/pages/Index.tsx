
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import { GlobalHeader } from "@/components/GlobalHeader";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader 
            title="Dashboard" 
            subtitle="Visão geral do sistema" 
          />
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
