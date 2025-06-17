
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CancelarPropostaContent } from "@/components/CancelarPropostaContent";

const CancelarProposta = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <CancelarPropostaContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CancelarProposta;
