
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReenvioCallbacksContent } from "@/components/ReenvioCallbacksContent";

const ReenvioCallbacks = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <ReenvioCallbacksContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ReenvioCallbacks;
