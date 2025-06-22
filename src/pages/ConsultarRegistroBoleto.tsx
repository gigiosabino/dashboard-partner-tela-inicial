
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ConsultarRegistroBoletoContent } from "@/components/ConsultarRegistroBoletoContent";

const ConsultarRegistroBoleto = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ConsultarRegistroBoletoContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsultarRegistroBoleto;
