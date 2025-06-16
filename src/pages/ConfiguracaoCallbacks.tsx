
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ConfiguracaoCallbacksContent } from "@/components/ConfiguracaoCallbacksContent";

const ConfiguracaoCallbacks = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ConfiguracaoCallbacksContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConfiguracaoCallbacks;
