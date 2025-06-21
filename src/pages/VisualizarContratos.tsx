
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VisualizarContratosContent } from "@/components/VisualizarContratosContent";

const VisualizarContratos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <VisualizarContratosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VisualizarContratos;
