
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReenviarLinkAssinaturaContent } from "@/components/ReenviarLinkAssinaturaContent";
import { Toaster } from "@/components/ui/toaster";

const ReenviarLinkAssinatura = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ReenviarLinkAssinaturaContent />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ReenviarLinkAssinatura;
