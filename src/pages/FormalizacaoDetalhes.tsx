
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FormalizacaoDetalhesContent } from "@/components/FormalizacaoDetalhesContent";

const FormalizacaoDetalhes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <FormalizacaoDetalhesContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FormalizacaoDetalhes;
