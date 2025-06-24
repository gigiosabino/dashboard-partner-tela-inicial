
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ConsultaCcbContent } from "@/components/ConsultaCcbContent";
import { Toaster } from "@/components/ui/toaster";

const ConsultaCcb = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ConsultaCcbContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ConsultaCcb;
