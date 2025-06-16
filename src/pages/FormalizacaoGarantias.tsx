
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FormalizacaoGarantiasContent } from "@/components/FormalizacaoGarantiasContent";

const FormalizacaoGarantias = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <FormalizacaoGarantiasContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FormalizacaoGarantias;
