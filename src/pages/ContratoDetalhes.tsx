
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContratoDetalhesContent } from "@/components/ContratoDetalhesContent";

const ContratoDetalhes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ContratoDetalhesContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ContratoDetalhes;
