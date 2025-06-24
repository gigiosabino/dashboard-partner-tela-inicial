
import { ImportacoesRealizadasContent } from "@/components/ImportacoesRealizadasContent";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const ImportacoesRealizadas = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <ImportacoesRealizadasContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ImportacoesRealizadas;
