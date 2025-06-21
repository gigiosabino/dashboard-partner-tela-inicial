
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BoletosContent } from "@/components/BoletosContent";

const Boletos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <BoletosContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Boletos;
