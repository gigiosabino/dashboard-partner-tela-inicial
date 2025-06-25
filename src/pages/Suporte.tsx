
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GlobalHeader } from "@/components/GlobalHeader";
import { SuporteContent } from "@/components/SuporteContent";

export default function Suporte() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <GlobalHeader 
            title="Suporte" 
            subtitle="Abra um chamado diretamente pelo sistema"
          />
          <SuporteContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
