
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ClientesCadastradosContent } from "@/components/ClientesCadastradosContent";

const ClientesCadastrados = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ClientesCadastradosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ClientesCadastrados;
