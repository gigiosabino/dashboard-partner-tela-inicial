
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ClienteDetalhesContent } from "@/components/ClienteDetalhesContent";
import { Toaster } from "@/components/ui/toaster";

const ClienteDetalhes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ClienteDetalhesContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ClienteDetalhes;
