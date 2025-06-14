
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RelatoriosServicosContent } from "@/components/RelatoriosServicosContent";

const RelatoriosServicos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <RelatoriosServicosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RelatoriosServicos;
