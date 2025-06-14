
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PropostaDetalhesContent } from "@/components/PropostaDetalhesContent";

const PropostaDetalhes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <PropostaDetalhesContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PropostaDetalhes;
