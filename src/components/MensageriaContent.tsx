
import { GlobalHeader } from "@/components/GlobalHeader";

export function MensageriaContent() {
  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Mensageria" 
        subtitle="Sistema de mensagens e comunicação" 
      />

      <main className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Mensageria</h2>
          <p className="text-gray-600">Sistema de mensagens em desenvolvimento</p>
        </div>
      </main>
    </div>
  );
}
