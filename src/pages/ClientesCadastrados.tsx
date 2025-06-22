
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ClientesCadastradosContent } from "@/components/ClientesCadastradosContent";
import { Toaster } from "@/components/ui/toaster";

const ClientesCadastrados = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ClientesCadastradosContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ClientesCadastrados;
