
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PropostasContent } from "@/components/PropostasContent";

const Propostas = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <PropostasContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Propostas;
