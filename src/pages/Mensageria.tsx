
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MensageriaContent } from "@/components/MensageriaContent";

const Mensageria = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <MensageriaContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Mensageria;
