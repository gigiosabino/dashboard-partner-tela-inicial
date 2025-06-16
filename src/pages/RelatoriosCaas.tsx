
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RelatoriosCaasContent } from "@/components/RelatoriosCaasContent";

const RelatoriosCaas = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <RelatoriosCaasContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RelatoriosCaas;
