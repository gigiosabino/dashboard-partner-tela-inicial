
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AtualizarDadosBancariosContent } from "@/components/AtualizarDadosBancariosContent";

const AtualizarDadosBancarios = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <AtualizarDadosBancariosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AtualizarDadosBancarios;
