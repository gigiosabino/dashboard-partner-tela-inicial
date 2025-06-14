
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GestaoAcessosContent } from "@/components/GestaoAcessosContent";
import { Toaster } from "@/components/ui/toaster";

const GestaoAcessos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GestaoAcessosContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default GestaoAcessos;
