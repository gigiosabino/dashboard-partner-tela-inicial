
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ConsultaPropostaContent } from "@/components/ConsultaPropostaContent";
import { Toaster } from "@/components/ui/toaster";

const ConsultaProposta = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ConsultaPropostaContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ConsultaProposta;
